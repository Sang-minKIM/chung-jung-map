import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NoticeRow {
    id: number;
    title: string;
    category: string | null;
    source: string | null;
    original_url: string | null;
    start_date: string | null;
    end_date: string | null;
    content_summary: string | null;
    policy_number: string | null;
    created_at: string;
    vector: number[] | null;
}

interface PolicyRow {
    id: number;
    title: string;
    category: string;
    vector: number[] | null;
}

interface PaginationParams {
    page: number;
    limit: number;
    offset: number;
}

interface NoticeWithSimilarity extends NoticeRow {
    similarity?: number;
}

// 데이터베이스 데이터를 카멜 케이스로 변환하는 함수
function transformNoticeToResponse(notice: NoticeWithSimilarity) {
    return {
        id: notice.id,
        title: notice.title,
        category: notice.category,
        source: notice.source,
        url: notice.original_url,
        startDate: notice.start_date,
        endDate: notice.end_date,
        ...(notice.similarity !== undefined && { similarity: notice.similarity }),
    };
}

Deno.serve(async (req) => {
    // CORS Preflight 요청 처리
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // URL 파라미터 파싱
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        // 페이지네이션 파라미터
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
        const offset = (page - 1) * limit;

        // 정책 ID (옵션)
        const policyId = searchParams.get("policyId");

        console.log(`공고 리스트 요청 - 페이지: ${page}, 한계: ${limit}, 정책ID: ${policyId || "없음"}`);

        // Supabase 클라이언트 생성
        const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SERVICE_ROLE_KEY") ?? "");

        let notices: NoticeWithSimilarity[] = [];
        let totalCount = 0;
        let policy: PolicyRow | null = null;

        if (policyId) {
            // 정책 ID가 제공된 경우: 벡터 유사도 기반 검색
            console.log(`정책 ID ${policyId}와 유사한 공고 검색 시작`);

            // 1. 해당 정책의 벡터 가져오기
            const { data: policyData, error: policyError } = await supabaseClient
                .from("policies")
                .select("id, title, category, vector")
                .eq("id", policyId)
                .single();

            if (policyError || !policyData) {
                return new Response(
                    JSON.stringify({
                        error: "정책을 찾을 수 없습니다.",
                        policy_id: policyId,
                    }),
                    {
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                        status: 404,
                    }
                );
            }

            policy = policyData;

            if (!policyData.vector) {
                return new Response(
                    JSON.stringify({
                        error: "해당 정책의 벡터가 생성되지 않았습니다. 먼저 정책 벡터를 생성해주세요.",
                        policy_id: policyId,
                    }),
                    {
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                        status: 400,
                    }
                );
            }

            // 2. 벡터 유사도 검색 (PostgreSQL에서 cosine similarity 사용)
            const vectorStr = `[${policyData.vector.join(",")}]`;

            // 유사도 검색 쿼리 (cosine similarity 사용)
            const { data: similarNotices, error: searchError } = await supabaseClient.rpc("search_similar_notices", {
                query_embedding: vectorStr,
                similarity_threshold: 0.3, // 30% 이상 유사도
                match_count: limit,
                offset_count: offset,
            });

            if (searchError) {
                console.error("벡터 검색 오류:", searchError);
                return new Response(
                    JSON.stringify({
                        error: "벡터 검색 중 오류가 발생했습니다.",
                        details: searchError.message,
                    }),
                    {
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                        status: 500,
                    }
                );
            }

            notices = similarNotices || [];

            // 유사도 검색의 경우 정확한 총 개수를 얻기 어려우므로 근사값 사용
            totalCount = notices.length < limit ? offset + notices.length : offset + limit + 1;

            console.log(`${notices.length}개의 유사한 공고를 찾았습니다`);
        } else {
            // 정책 ID가 없는 경우: 일반 페이지네이션 검색
            console.log("일반 공고 리스트 검색");

            // 전체 개수 조회
            const { count, error: countError } = await supabaseClient
                .from("notices")
                .select("*", { count: "exact", head: true });

            if (countError) {
                throw new Error(`개수 조회 실패: ${countError.message}`);
            }

            totalCount = count || 0;

            // 공고 데이터 조회 (필요한 필드만 선택)
            const { data: noticesData, error: noticesError } = await supabaseClient
                .from("notices")
                .select(
                    `
                    id, title, category, source, original_url, 
                    start_date, end_date
                `
                )
                .order("created_at", { ascending: false })
                .range(offset, offset + limit - 1);

            if (noticesError) {
                throw new Error(`공고 조회 실패: ${noticesError.message}`);
            }

            notices = noticesData || [];
            console.log(`${notices.length}개의 공고를 조회했습니다`);
        }

        // 페이지네이션 정보 계산
        const totalPages = Math.ceil(totalCount / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        // 응답 데이터 구성 (카멜 케이스로 변환)
        const response = {
            data: notices.map(transformNoticeToResponse),
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
            },
            ...(policyId &&
                policy && {
                    policyInfo: {
                        id: parseInt(policyId),
                        title: policy.title,
                        searchType: "vector_similarity",
                    },
                }),
        };

        return new Response(JSON.stringify(response), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("공고 리스트 API 오류:", error.message);

        return new Response(
            JSON.stringify({
                error: error.message,
                details: "공고 리스트 조회 중 오류가 발생했습니다.",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
