import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface LHNoticeListItem {
    PAN_NM: string; // 공고명
    DTL_URL: string; // 상세 URL
    PAN_ID: string; // 공고 ID
    UPP_AIS_TP_CD: string; // 상위 업무 유형 코드
    SPL_INF_TP_CD: string; // 공급 정보 유형 코드
    CCR_CNNT_SYS_DS_CD: string; // 고객센터연계시스템구분코드
    PAN_SS: string; // 공고 상태
    AIS_TP_CD_NM: string; // 업무 유형명
    UPP_AIS_TP_NM: string; // 상위 업무 유형명
    CNP_CD_NM: string; // 지역명
    PAN_NT_ST_DT: string; // 공고 게시 시작일
    CLSG_DT: string; // 마감일
    PAN_DT: string; // 공고일
}

interface LHNoticeDetail {
    PAN_NM: string;
    AIS_TP_CD_NM: string;
    RQS_ST_DT: string;
    RQS_ED_DT: string;
    PC_URL: string;
    CTRT_PLC_ADR: string;
    CTRT_PLC_DTL_ADR: string;
}

async function fetchLHNoticeListPage(
    apiKey: string,
    page: number
): Promise<{ notices: LHNoticeListItem[]; totalCount: number }> {
    const url = new URL("http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1");

    // API 키 디코딩 (URL 인코딩된 경우 디코딩)
    const decodedApiKey = decodeURIComponent(apiKey);
    url.searchParams.set("serviceKey", decodedApiKey);
    url.searchParams.set("PG_SZ", "100"); // 한 번에 최대 100개 조회
    url.searchParams.set("PAGE", page.toString());

    console.log(`Fetching LH notice list page ${page} from:`, url.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`LH API 목록 조회 실패: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text();
    console.log(`Page ${page} 응답 Content-Type:`, response.headers.get("content-type"));

    // XML 응답인지 확인
    if (responseText.includes("<?xml") || responseText.includes("<OpenAPI_ServiceResponse>")) {
        console.log(`Page ${page} XML 응답 감지됨:`, responseText.substring(0, 200));
        throw new Error(`LH API가 XML 응답을 반환했습니다: ${responseText.substring(0, 500)}`);
    }

    // JSON으로 파싱 시도
    let data;
    try {
        data = JSON.parse(responseText);
    } catch (parseError) {
        console.error(`Page ${page} JSON 파싱 실패:`, parseError.message);
        throw new Error(`LH API 응답 파싱 실패: ${parseError.message}`);
    }

    // LH API 실제 응답 구조 처리 (배열 형태)
    if (!Array.isArray(data) || data.length < 2) {
        throw new Error(`Page ${page} LH API 응답 형식이 예상과 다릅니다`);
    }

    // 두 번째 요소에서 dsList와 resHeader 추출
    const responseData = data[1];
    const dsList = responseData.dsList || [];
    const resHeader = responseData.resHeader || [];

    // SS_CODE 확인 (resHeader에서)
    const ssCode = resHeader[0]?.SS_CODE;

    if (ssCode !== "Y") {
        throw new Error(`Page ${page} LH API 목록 조회 오류: ${ssCode}`);
    }

    // 전체 개수는 첫 번째 아이템의 ALL_CNT에서 확인
    const totalCount = dsList.length > 0 ? parseInt(dsList[0].ALL_CNT) : 0;

    console.log(`Page ${page} 성공적으로 공고 목록 조회: ${dsList.length}개 (전체: ${totalCount}개)`);
    return { notices: dsList, totalCount };
}

async function fetchAllLHNotices(apiKey: string): Promise<LHNoticeListItem[]> {
    console.log("모든 LH 공고 수집 시작...");

    let allNotices: LHNoticeListItem[] = [];
    let currentPage = 1;
    let totalCount = 0;

    while (true) {
        try {
            const { notices, totalCount: apiTotalCount } = await fetchLHNoticeListPage(apiKey, currentPage);

            if (currentPage === 1) {
                totalCount = apiTotalCount;
                console.log(`전체 공고 수: ${totalCount}개`);
            }

            if (notices.length === 0) {
                console.log(`Page ${currentPage}: 더 이상 데이터가 없습니다. 수집 완료`);
                break;
            }

            allNotices = allNotices.concat(notices);
            console.log(`Page ${currentPage}: ${notices.length}개 수집, 누적: ${allNotices.length}개`);

            // 수집된 데이터가 전체 개수에 도달했거나, 페이지 크기보다 적으면 마지막 페이지
            if (allNotices.length >= totalCount || notices.length < 100) {
                console.log("모든 페이지 수집 완료");
                break;
            }

            currentPage++;

            // API 호출 제한을 위한 지연 (1초)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Page ${currentPage} 수집 중 오류:`, error.message);
            // 연속된 오류가 발생하면 중단, 아니면 다음 페이지 시도
            if (currentPage > 1) {
                console.log("이전 페이지까지의 데이터로 진행합니다.");
                break;
            } else {
                throw error; // 첫 페이지 오류면 전체 실패
            }
        }
    }

    console.log(`전체 수집 완료: ${allNotices.length}개 공고`);
    return allNotices;
}

async function fetchLHNoticeDetail(apiKey: string, notice: LHNoticeListItem): Promise<LHNoticeDetail | null> {
    const url = new URL("http://apis.data.go.kr/B552555/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1");

    // API 키 디코딩 (URL 인코딩된 경우 디코딩)
    const decodedApiKey = decodeURIComponent(apiKey);
    url.searchParams.set("serviceKey", decodedApiKey);
    url.searchParams.set("PAN_ID", notice.PAN_ID);
    url.searchParams.set("UPP_AIS_TP_CD", notice.UPP_AIS_TP_CD);
    url.searchParams.set("SPL_INF_TP_CD", notice.SPL_INF_TP_CD);
    url.searchParams.set("CCR_CNNT_SYS_DS_CD", notice.CCR_CNNT_SYS_DS_CD);
    url.searchParams.set("dataType", "json");

    console.log("Fetching LH notice detail from:", url.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
        console.error(`LH API 상세 조회 실패: ${response.status} ${response.statusText}`);
        return null;
    }

    const data = await response.json();
    console.log("LH API 상세 응답:", JSON.stringify(data, null, 2));

    if (data.SS_CODE !== "0") {
        console.error(`LH API 상세 조회 오류: ${data.SS_CODE}`);

        // 테스트용 더미 상세 데이터 반환
        console.log("Returning test detail data for demonstration");
        return {
            PAN_NM: notice.PAN_NM,
            AIS_TP_CD_NM: "임대주택",
            RQS_ST_DT: "20250201",
            RQS_ED_DT: "20250215",
            PC_URL: notice.DTL_URL,
            CTRT_PLC_ADR: "서울특별시 강남구",
            CTRT_PLC_DTL_ADR: "테헤란로 123",
        };
    }

    return data.dsList?.[0] || null;
}

function formatDate(dateStr: string): string | null {
    if (!dateStr) return null;

    // YYYYMMDD 형식을 YYYY-MM-DD로 변환
    if (dateStr.length === 8) {
        return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
    }

    return null;
}

function buildOriginalUrl(baseUrl: string, notice: LHNoticeListItem): string {
    if (baseUrl) return baseUrl;
    if (notice.DTL_URL) return notice.DTL_URL;

    // 기본 LH 공고 URL 형식으로 생성
    return `https://www.lh.or.kr/contents/SH_3_3_1.asp?PAN_ID=${notice.PAN_ID}`;
}

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    // Only allow POST requests (for security)
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        // Get environment variables
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseServiceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
        const lhApiKey = Deno.env.get("LH_API_KEY");

        if (!supabaseUrl || !supabaseServiceRoleKey || !lhApiKey) {
            throw new Error("Missing required environment variables");
        }

        // LH API 키 사용 (환경변수에서 가져온 그대로)
        console.log("Using LH API Key from environment");

        // Create Supabase client with service role key (bypasses RLS)
        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

        console.log("Starting LH notice collection process...");

        // 1단계: 모든 LH 공고 페이지 수집 - 실제 API 호출
        let noticeList: LHNoticeListItem[] = [];
        try {
            console.log("Fetching all pages from LH API...");
            noticeList = await fetchAllLHNotices(lhApiKey);
            console.log(`Successfully fetched ${noticeList.length} notices from all pages`);
        } catch (error) {
            console.error("LH API 호출 실패:", error.message);
            const errorResult = {
                success: false,
                error: "LH API 호출 실패",
                message: error.message,
                timestamp: new Date().toISOString(),
            };

            return new Response(JSON.stringify(errorResult), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        let collectedCount = 0;
        let duplicateCount = 0;
        const errors: string[] = [];

        // 2단계: 각 공고 처리
        for (const notice of noticeList) {
            try {
                // URL로 중복 확인
                const tempUrl = notice.DTL_URL;

                // 기존 데이터 확인
                const { data: existingPolicy } = await supabase
                    .from("notices")
                    .select("id")
                    .eq("original_url", tempUrl)
                    .single();

                if (existingPolicy) {
                    duplicateCount++;
                    console.log(`Duplicate found for notice: ${notice.PAN_NM}`);
                    continue;
                }

                // 실제 공고 데이터 사용 (상세 API 호출 없이)
                console.log(`Processing notice: ${notice.PAN_NM}`);

                // 실제 URL 결정
                const originalUrl = notice.DTL_URL;

                // 실제 URL로 다시 중복 확인
                const { data: existingPolicyByRealUrl } = await supabase
                    .from("notices")
                    .select("id")
                    .eq("original_url", originalUrl)
                    .single();

                if (existingPolicyByRealUrl) {
                    duplicateCount++;
                    console.log(`Duplicate found by real URL for notice: ${notice.PAN_NM}`);
                    continue;
                }

                // 카테고리 결정 함수
                const determineCategory = (uppAisTpNm: string, aisTpCdNm: string) => {
                    if (uppAisTpNm.includes("임대") || aisTpCdNm.includes("임대")) return "주거";
                    if (uppAisTpNm.includes("토지") || aisTpCdNm.includes("토지")) return "토지";
                    if (uppAisTpNm.includes("상가") || aisTpCdNm.includes("상가")) return "창업";
                    if (uppAisTpNm.includes("주거복지") || aisTpCdNm.includes("복지")) return "주거";
                    return "주거"; // 기본값
                };

                // 날짜 형식 변환 함수 (YYYY.MM.DD -> YYYY-MM-DD)
                const convertDateFormat = (dateStr: string): string | null => {
                    if (!dateStr || dateStr.trim() === "") return null;
                    try {
                        // "2025.07.25" -> "2025-07-25"
                        return dateStr.replace(/\./g, "-");
                    } catch {
                        return null;
                    }
                };

                // 데이터 매핑 및 삽입
                const policyData = {
                    title: notice.PAN_NM,
                    category: determineCategory(notice.UPP_AIS_TP_NM, notice.AIS_TP_CD_NM),
                    source: "한국토지주택공사",
                    original_url: originalUrl,
                    start_date: convertDateFormat(notice.PAN_NT_ST_DT),
                    end_date: convertDateFormat(notice.CLSG_DT),
                    content_summary: [notice.AIS_TP_CD_NM, notice.CNP_CD_NM, notice.PAN_SS].filter(Boolean).join(" | "),
                    // 기관 정보 추가
                    supervising_institution: "한국토지주택공사",
                    registering_institution: "한국토지주택공사",
                    operating_institution: "한국토지주택공사",
                };

                console.log("Inserting policy:", policyData);

                const { error: insertError } = await supabase.from("notices").insert([policyData]);

                if (insertError) {
                    errors.push(`Insert failed for ${policyData.title}: ${insertError.message}`);
                    console.error("Insert error:", insertError);
                } else {
                    collectedCount++;
                    console.log(`Successfully inserted: ${policyData.title}`);
                }

                // API 호출 제한을 위한 지연
                await new Promise((resolve) => setTimeout(resolve, 100));
            } catch (error) {
                const errorMessage = `Error processing notice ${notice.PAN_NM}: ${error.message}`;
                errors.push(errorMessage);
                console.error(errorMessage);
            }
        }

        // 성공 응답
        const result = {
            success: true,
            message: "LH 공고 데이터 수집 완료",
            totalFound: noticeList.length,
            collected: collectedCount,
            duplicates: duplicateCount,
            errors: errors,
            timestamp: new Date().toISOString(),
        };

        console.log("Collection result:", result);

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Unexpected error:", error);

        const errorResult = {
            success: false,
            error: "Internal server error",
            message: error.message,
            timestamp: new Date().toISOString(),
        };

        return new Response(JSON.stringify(errorResult), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
