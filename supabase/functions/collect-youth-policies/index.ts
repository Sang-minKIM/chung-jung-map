import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface YouthPolicyApiResponse {
    resultCode: number;
    resultMessage: string;
    result: {
        pagging: {
            totalCount: number;
            currentPageNo: number;
            totalPageNo: number;
            pageSize: number;
        };
        youthPolicyList: YouthPolicyItem[];
    };
}

interface YouthPolicyItem {
    plcyNo: string; // 정책번호
    plcyNm: string; // 정책명
    lclsfNm: string; // 대분류명
    mclsfNm: string; // 중분류명
    sclsfNm?: string; // 소분류명
    plcySprtCn: string; // 정책지원내용
    orgNm: string; // 주관기관명
    aplyBgnYmd?: string; // 신청시작일자 (YYYYMMDD)
    aplyEndYmd?: string; // 신청종료일자 (YYYYMMDD)
    aplyYmd?: string; // 신청기간 (YYYYMMDD ~ YYYYMMDD)
    plcyUrl?: string; // 정책URL
    aplyUrlAddr?: string; // 신청URL
    sprtTrgtMinAge?: string; // 지원대상최소연령
    sprtTrgtMaxAge?: string; // 지원대상최대연령
    plcySprttgCn?: string; // 정책지원대상내용
    aplyMthCn?: string; // 신청방법내용 (구버전)
    plcyAplyMthdCn?: string; // 정책신청방법내용
    opshrInsdNm?: string; // 운영기관명 (구버전 - 사용안함)
    sprvsnInstCdNm?: string; // 주관기관명
    operInstCdNm?: string; // 운영기관명
    rgtrInstCdNm?: string; // 등록기관명
    rgtrHghrkInstCdNm?: string; // 등록최상위기관명 (지역관할기관)
    // 새로 추가된 상세 필드들
    plcyExplnCn?: string; // 정책설명
    etcMttrCn?: string; // 기타내용
    srngMthdCn?: string; // 심사방법
    sbmsnDcmntCn?: string; // 제출서류내용
    refUrlAddr1?: string; // 참고URL
    [key: string]: any; // Additional fields
}

async function fetchYouthPolicyPage(
    apiKey: string,
    page: number,
    pageSize: number = 100
): Promise<YouthPolicyApiResponse> {
    const url = new URL("https://www.youthcenter.go.kr/go/ythip/getPlcy");

    url.searchParams.set("apiKeyNm", apiKey);
    url.searchParams.set("pageNum", page.toString());
    url.searchParams.set("pageSize", pageSize.toString());
    url.searchParams.set("rtnType", "json");

    console.log(`Fetching youth policy page ${page} from:`, url.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Youth Policy API 목록 조회 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.resultCode !== 200) {
        throw new Error(`Youth Policy API 오류: ${data.resultMessage}`);
    }

    console.log(
        `Page ${page} 성공적으로 청년정책 목록 조회: ${data.result.youthPolicyList.length}개 (전체: ${data.result.pagging.totalCount}개)`
    );
    return data;
}

async function fetchAllYouthPolicies(apiKey: string): Promise<YouthPolicyItem[]> {
    console.log("모든 청년정책 데이터 수집 시작...");

    let allPolicies: YouthPolicyItem[] = [];
    let currentPage = 1;
    const pageSize = 100;

    while (true) {
        try {
            const response = await fetchYouthPolicyPage(apiKey, currentPage, pageSize);
            const policies = response.result.youthPolicyList;
            const totalCount = response.result.pagging.totalCount;

            if (policies.length === 0) {
                console.log(`Page ${currentPage}: 더 이상 데이터가 없습니다. 수집 완료`);
                break;
            }

            allPolicies = allPolicies.concat(policies);
            console.log(`Page ${currentPage}: ${policies.length}개 수집, 누적: ${allPolicies.length}개`);

            // 모든 데이터를 수집했으면 종료
            if (allPolicies.length >= totalCount) {
                console.log("모든 페이지 수집 완료");
                break;
            }

            currentPage++;

            // API 호출 제한을 위한 지연 (0.5초)
            await new Promise((resolve) => setTimeout(resolve, 500));
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

    console.log(`전체 수집 완료: ${allPolicies.length}개 청년정책`);
    return allPolicies;
}

function mapCategoryFromPolicy(policy: YouthPolicyItem): string {
    const { lclsfNm, mclsfNm, sclsfNm } = policy;

    // 카테고리 매핑 로직 (대분류 > 중분류 > 소분류 순서로 확인)
    const fullCategory = [lclsfNm, mclsfNm, sclsfNm].filter(Boolean).join(" ");

    if (fullCategory.includes("주거") || fullCategory.includes("임대") || fullCategory.includes("월세")) {
        return "주거";
    }
    if (fullCategory.includes("창업") || fullCategory.includes("사업") || fullCategory.includes("기업")) {
        return "창업";
    }
    if (fullCategory.includes("취업") || fullCategory.includes("일자리") || fullCategory.includes("고용")) {
        return "취업";
    }
    if (fullCategory.includes("금융") || fullCategory.includes("대출") || fullCategory.includes("자금")) {
        return "금융";
    }

    // 기본값은 대분류명을 사용
    return lclsfNm || "기타";
}

function formatDate(dateStr?: string): string | null {
    if (!dateStr || dateStr.trim() === "") return null;

    try {
        // YYYYMMDD 형식을 YYYY-MM-DD로 변환
        if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
            return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
        }

        // YYYY-MM-DD 형식은 그대로 반환
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            return dateStr;
        }

        return null;
    } catch {
        return null;
    }
}

function parseDateRange(aplyYmd?: string): { startDate: string | null; endDate: string | null } {
    if (!aplyYmd || aplyYmd.trim() === "") {
        return { startDate: null, endDate: null };
    }

    try {
        // "20250310 ~ 20250326" 형식 파싱
        const trimmed = aplyYmd.trim();
        const match = trimmed.match(/^(\d{8})\s*~\s*(\d{8})$/);

        if (match) {
            const [, startDateStr, endDateStr] = match;
            return {
                startDate: formatDate(startDateStr),
                endDate: formatDate(endDateStr),
            };
        }

        // 단일 날짜인 경우 (YYYYMMDD)
        if (/^\d{8}$/.test(trimmed)) {
            const formattedDate = formatDate(trimmed);
            return {
                startDate: formattedDate,
                endDate: formattedDate,
            };
        }

        return { startDate: null, endDate: null };
    } catch {
        return { startDate: null, endDate: null };
    }
}

function buildContentSummary(policy: YouthPolicyItem): string {
    const parts = [
        policy.plcySprttgCn, // 정책지원대상내용
        policy.plcySprtCn, // 정책지원내용
        policy.plcyAplyMthdCn || policy.aplyMthCn, // 정책신청방법내용 (새 필드 우선, 없으면 구 필드)
    ].filter(Boolean);

    return parts.join(" | ");
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
        const youthPolicyApiKey = Deno.env.get("YOUTH_POLICY_API_KEY");

        if (!supabaseUrl || !supabaseServiceRoleKey || !youthPolicyApiKey) {
            throw new Error(
                "Missing required environment variables: SUPABASE_URL, SERVICE_ROLE_KEY, YOUTH_POLICY_API_KEY"
            );
        }

        // Create Supabase client with service role key (bypasses RLS)
        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

        console.log("Starting Youth Policy collection process...");

        // 1단계: 모든 청년정책 데이터 수집
        let policyList: YouthPolicyItem[] = [];
        try {
            console.log("Fetching all pages from Youth Policy API...");
            policyList = await fetchAllYouthPolicies(youthPolicyApiKey);
            console.log(`Successfully fetched ${policyList.length} youth policies from all pages`);
        } catch (error) {
            console.error("Youth Policy API 호출 실패:", error.message);
            const errorResult = {
                success: false,
                error: "Youth Policy API 호출 실패",
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

        // 2단계: 각 정책 처리
        for (const policy of policyList) {
            try {
                // policy_number로 중복 확인
                const { data: existingPolicy } = await supabase
                    .from("notices")
                    .select("id")
                    .eq("policy_number", policy.plcyNo)
                    .single();

                if (existingPolicy) {
                    duplicateCount++;
                    console.log(`Duplicate found for policy: ${policy.plcyNm} (${policy.plcyNo})`);
                    continue;
                }

                console.log(`Processing policy: ${policy.plcyNm} (${policy.plcyNo})`);

                // 날짜 파싱 (aplyYmd 우선, 없으면 기존 필드 사용)
                let startDate: string | null = null;
                let endDate: string | null = null;

                if (policy.aplyYmd) {
                    const parsedDates = parseDateRange(policy.aplyYmd);
                    startDate = parsedDates.startDate;
                    endDate = parsedDates.endDate;
                } else {
                    startDate = formatDate(policy.aplyBgnYmd);
                    endDate = formatDate(policy.aplyEndYmd);
                }

                // 데이터 매핑 및 삽입
                const policyData = {
                    policy_number: policy.plcyNo,
                    title: policy.plcyNm,
                    category: mapCategoryFromPolicy(policy),
                    source: policy.orgNm || "청년센터",
                    original_url: policy.aplyUrlAddr || policy.plcyUrl, // 신청 URL 우선, 없으면 정책 URL
                    start_date: startDate,
                    end_date: endDate,
                    content_summary: buildContentSummary(policy), // 기존 summary 로직 유지
                    // 새로 추가된 상세 필드들
                    description: policy.plcyExplnCn || null,
                    support_content: policy.plcySprtCn || null,
                    additional_info: policy.etcMttrCn || null,
                    supervising_institution: policy.sprvsnInstCdNm || null, // 주관기관
                    registering_institution: policy.rgtrInstCdNm || null, // 등록기관
                    regional_institution: policy.rgtrHghrkInstCdNm || null, // 지역관할기관 (등록최상위기관)
                    operating_institution: policy.operInstCdNm || null, // 운영기관 (수정됨)
                    application_method: policy.plcyAplyMthdCn || policy.aplyMthCn || null,
                    screening_method: policy.srngMthdCn || null,
                    required_documents: policy.sbmsnDcmntCn || null,
                    reference_url: policy.refUrlAddr1 || null,
                };

                console.log("Inserting policy:", {
                    policy_number: policyData.policy_number,
                    title: policyData.title,
                    category: policyData.category,
                });

                const { error: insertError } = await supabase.from("notices").insert([policyData]);

                if (insertError) {
                    errors.push(`Insert failed for ${policyData.title}: ${insertError.message}`);
                    console.error("Insert error:", insertError);
                } else {
                    collectedCount++;
                    console.log(`Successfully inserted: ${policyData.title}`);
                }

                // API 호출 제한을 위한 지연
                await new Promise((resolve) => setTimeout(resolve, 50));
            } catch (error) {
                const errorMessage = `Error processing policy ${policy.plcyNm}: ${error.message}`;
                errors.push(errorMessage);
                console.error(errorMessage);
            }
        }

        // 성공 응답
        const result = {
            success: true,
            message: "청년정책 데이터 수집 완료",
            totalFound: policyList.length,
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
