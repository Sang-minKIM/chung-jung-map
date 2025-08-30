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
    opshrInsdNm?: string; // 운영기관명
    [key: string]: any; // Additional fields
}

interface ExistingNotice {
    id: number;
    policy_number: string;
    start_date: string | null;
    end_date: string | null;
    original_url: string | null;
    content_summary: string | null;
}

async function fetchYouthPolicyByNumber(apiKey: string, policyNumber: string): Promise<YouthPolicyItem | null> {
    // 페이지별로 검색해서 해당 정책번호 찾기
    let currentPage = 1;
    const pageSize = 100;

    while (currentPage <= 50) {
        // 최대 50페이지까지만 검색
        try {
            const url = new URL("https://www.youthcenter.go.kr/go/ythip/getPlcy");
            url.searchParams.set("apiKeyNm", apiKey);
            url.searchParams.set("pageNum", currentPage.toString());
            url.searchParams.set("pageSize", pageSize.toString());
            url.searchParams.set("rtnType", "json");

            const response = await fetch(url.toString());
            if (!response.ok) {
                console.error(`API 호출 실패 (page ${currentPage}):`, response.status);
                break;
            }

            const data: YouthPolicyApiResponse = await response.json();

            if (data.resultCode !== 200) {
                console.error(`API 오류 (page ${currentPage}):`, data.resultMessage);
                break;
            }

            // 해당 정책번호 찾기
            const foundPolicy = data.result.youthPolicyList.find((policy) => policy.plcyNo === policyNumber);
            if (foundPolicy) {
                console.log(`정책번호 ${policyNumber} 찾음 (page ${currentPage})`);
                return foundPolicy;
            }

            // 더 이상 데이터가 없으면 종료
            if (data.result.youthPolicyList.length === 0) {
                break;
            }

            currentPage++;

            // API 호출 제한을 위한 지연
            await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
            console.error(`페이지 ${currentPage} 검색 중 오류:`, error.message);
            break;
        }
    }

    return null;
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

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    // Only allow POST requests
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

        console.log("Starting Youth Policy migration process...");

        // 1단계: 기존 청년정책 데이터 조회 (start_date가 null인 것들만)
        const { data: existingNotices, error: fetchError } = await supabase
            .from("notices")
            .select("id, policy_number, start_date, end_date, original_url, content_summary")
            .not("policy_number", "is", null) // policy_number가 있는 것들만
            .is("start_date", null); // start_date가 null인 것들만

        if (fetchError) {
            throw new Error(`기존 데이터 조회 실패: ${fetchError.message}`);
        }

        console.log(`마이그레이션 대상: ${existingNotices?.length || 0}개`);

        if (!existingNotices || existingNotices.length === 0) {
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "마이그레이션 대상 데이터가 없습니다.",
                    updated: 0,
                    errors: [],
                    timestamp: new Date().toISOString(),
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        let updatedCount = 0;
        let skippedCount = 0;
        const errors: string[] = [];

        // 2단계: 각 정책에 대해 최신 데이터 조회 및 업데이트
        for (const notice of existingNotices) {
            try {
                console.log(`Processing notice ID ${notice.id}, policy_number: ${notice.policy_number}`);

                // API에서 해당 정책번호의 최신 데이터 조회
                const latestPolicy = await fetchYouthPolicyByNumber(youthPolicyApiKey, notice.policy_number);

                if (!latestPolicy) {
                    skippedCount++;
                    console.log(`정책번호 ${notice.policy_number}를 API에서 찾을 수 없음`);
                    continue;
                }

                // 업데이트할 데이터 준비
                const updateData: any = {};

                // 날짜 정보 업데이트 (aplyYmd 우선)
                if (latestPolicy.aplyYmd) {
                    const parsedDates = parseDateRange(latestPolicy.aplyYmd);
                    if (parsedDates.startDate || parsedDates.endDate) {
                        updateData.start_date = parsedDates.startDate;
                        updateData.end_date = parsedDates.endDate;
                    }
                } else if (latestPolicy.aplyBgnYmd || latestPolicy.aplyEndYmd) {
                    updateData.start_date = formatDate(latestPolicy.aplyBgnYmd);
                    updateData.end_date = formatDate(latestPolicy.aplyEndYmd);
                }

                // URL 업데이트 (aplyUrlAddr 우선)
                if (latestPolicy.aplyUrlAddr || latestPolicy.plcyUrl) {
                    updateData.original_url = latestPolicy.aplyUrlAddr || latestPolicy.plcyUrl;
                }

                // content_summary에 plcyAplyMthdCn 추가
                if (latestPolicy.plcyAplyMthdCn && latestPolicy.plcyAplyMthdCn.trim() !== "") {
                    const currentSummary = notice.content_summary || "";
                    if (!currentSummary.includes(latestPolicy.plcyAplyMthdCn)) {
                        updateData.content_summary = currentSummary
                            ? `${currentSummary} | ${latestPolicy.plcyAplyMthdCn}`
                            : latestPolicy.plcyAplyMthdCn;
                    }
                }

                // 업데이트할 데이터가 있는 경우에만 업데이트
                if (Object.keys(updateData).length > 0) {
                    const { error: updateError } = await supabase
                        .from("notices")
                        .update(updateData)
                        .eq("id", notice.id);

                    if (updateError) {
                        errors.push(`ID ${notice.id} 업데이트 실패: ${updateError.message}`);
                        console.error("Update error:", updateError);
                    } else {
                        updatedCount++;
                        console.log(`Successfully updated notice ID ${notice.id}`);
                    }
                } else {
                    skippedCount++;
                    console.log(`No updates needed for notice ID ${notice.id}`);
                }

                // API 호출 제한을 위한 지연
                await new Promise((resolve) => setTimeout(resolve, 100));
            } catch (error) {
                const errorMessage = `Notice ID ${notice.id} 처리 중 오류: ${error.message}`;
                errors.push(errorMessage);
                console.error(errorMessage);
            }
        }

        // 성공 응답
        const result = {
            success: true,
            message: "청년정책 데이터 마이그레이션 완료",
            totalProcessed: existingNotices.length,
            updated: updatedCount,
            skipped: skippedCount,
            errors: errors,
            timestamp: new Date().toISOString(),
        };

        console.log("Migration result:", result);

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
