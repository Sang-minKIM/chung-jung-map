import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NoticeRow {
    id: number;
    title: string;
    category: string | null;
    original_url: string | null;
    start_date: string | null;
    end_date: string | null;
    // NoticeListItem에서 사용하는 필드들만
    description: string | null;
    supervising_institution: string | null;
    regional_institution: string | null;
}

interface PolicyRow {
    id: number;
    title: string;
    category: string;
    vector: any; // pgvector 타입 (Supabase에서 자동으로 처리됨)
}

interface PaginationParams {
    page: number;
    limit: number;
    offset: number;
}

interface NoticeWithSimilarity extends NoticeRow {
    similarity?: number;
}

// 데이터베이스 데이터를 프론트엔드 NoticeListItem 타입으로 변환하는 함수
function transformNoticeToResponse(notice: NoticeWithSimilarity) {
    return {
        id: notice.id,
        title: notice.title,
        category: notice.category,
        description: notice.description,
        url: notice.original_url,
        startDate: notice.start_date,
        endDate: notice.end_date,
        supervisingInstitution: notice.supervising_institution,
        regionalInstitution: notice.regional_institution,
        ...(notice.similarity !== undefined && { similarity: notice.similarity }),
    };
}

// 공고 상세용 변환 함수
interface NoticeDetailRow {
    id: number;
    title: string;
    category: string | null;
    description: string | null;
    original_url: string | null;
    start_date: string | null;
    end_date: string | null;
    content_summary: string | null;
    support_content: string | null;
    additional_info: string | null;
    supervising_institution: string | null;
    registering_institution: string | null;
    regional_institution: string | null;
    operating_institution: string | null;
    application_method: string | null;
    screening_method: string | null;
    required_documents: string | null;
    reference_url: string | null;
    created_at: string;
}

function transformNoticeDetailToResponse(notice: NoticeDetailRow) {
    return {
        id: notice.id,
        title: notice.title,
        category: notice.category,
        description: notice.description,
        url: notice.original_url,
        startDate: notice.start_date,
        endDate: notice.end_date,
        supportContent: notice.support_content,
        additionalInfo: notice.additional_info,
        operatingInstitution: notice.operating_institution,
        registeringInstitution: notice.registering_institution,
        supervisingInstitution: notice.supervising_institution,
        regionalInstitution: notice.regional_institution,
        applicationMethod: notice.application_method,
        screeningMethod: notice.screening_method,
        requiredDocuments: notice.required_documents,
        referenceUrl: notice.reference_url,
    };
}

Deno.serve(async (req) => {
    // CORS Preflight 요청 처리
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    // GET 요청만 허용
    if (req.method !== "GET") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        // URL 파싱
        const url = new URL(req.url);
        const pathSegments = url.pathname.split("/");

        // /functions/v1/notices/{id} 형태에서 마지막 세그먼트가 ID인지 확인
        const lastSegment = pathSegments[pathSegments.length - 1];
        const isDetailRequest = lastSegment !== "notices" && !isNaN(parseInt(lastSegment));

        if (isDetailRequest) {
            // 공고 상세 요청 처리
            return await handleNoticeDetail(url, pathSegments);
        } else {
            // 공고 리스트 요청 처리
            return await handleNoticeList(url);
        }
    } catch (error) {
        console.error("공고 API 오류:", error.message);
        return new Response(
            JSON.stringify({
                error: error.message,
                details: "공고 API 처리 중 오류가 발생했습니다.",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});

// 공고 상세 처리 함수
async function handleNoticeDetail(url: URL, pathSegments: string[]) {
    const noticeIdStr = pathSegments[pathSegments.length - 1];

    if (!noticeIdStr) {
        return new Response(
            JSON.stringify({
                error: "공고 ID가 필요합니다.",
                message: "URL 형식: /notices/{id}",
            }),
            {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    const noticeId = parseInt(noticeIdStr);

    if (isNaN(noticeId) || noticeId <= 0) {
        return new Response(
            JSON.stringify({
                error: "유효하지 않은 공고 ID입니다.",
                providedId: noticeIdStr,
            }),
            {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    console.log(`공고 상세 조회 요청 - ID: ${noticeId}`);

    // Supabase 클라이언트 생성
    const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SERVICE_ROLE_KEY") ?? "");

    // 공고 상세 데이터 조회
    const { data: noticeData, error: noticeError } = await supabaseClient
        .from("notices")
        .select(
            `
            id, title, category, description, original_url, 
            start_date, end_date, content_summary,
            support_content, additional_info, 
            supervising_institution, registering_institution, regional_institution, operating_institution,
            application_method, screening_method, required_documents, reference_url,
            created_at
        `
        )
        .eq("id", noticeId)
        .single();

    if (noticeError) {
        if (noticeError.code === "PGRST116") {
            return new Response(
                JSON.stringify({
                    error: "공고를 찾을 수 없습니다.",
                    noticeId: noticeId,
                }),
                {
                    status: 404,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }
        throw new Error(`공고 조회 실패: ${noticeError.message}`);
    }

    if (!noticeData) {
        return new Response(
            JSON.stringify({
                error: "공고를 찾을 수 없습니다.",
                noticeId: noticeId,
            }),
            {
                status: 404,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    console.log(`공고 상세 조회 성공 - ID: ${noticeId}, 제목: ${noticeData.title}`);

    // 응답 데이터 구성 (상세용 변환 함수 사용)
    const response = {
        data: transformNoticeDetailToResponse(noticeData),
    };

    return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
    });
}

// 공고 리스트 처리 함수
async function handleNoticeList(url: URL) {
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

        // 2. 유사도 임계값에 해당하는 전체 개수 조회
        const { data: totalCountData, error: countError } = await supabaseClient.rpc("count_similar_notices", {
            query_embedding: policyData.vector,
            similarity_threshold: 0.83, // 83% 이상 유사도
        });

        if (countError) {
            console.error("벡터 개수 조회 오류:", countError);
            return new Response(
                JSON.stringify({
                    error: "벡터 개수 조회 중 오류가 발생했습니다.",
                    details: countError.message,
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 500,
                }
            );
        }

        totalCount = totalCountData || 0;

        // 3. 벡터 유사도 검색 (PostgreSQL pgvector 사용)
        // pgvector 타입이므로 벡터를 그대로 전달
        const { data: similarNotices, error: searchError } = await supabaseClient.rpc("search_similar_notices", {
            query_embedding: policyData.vector,
            similarity_threshold: 0.83, // 83% 이상 유사도
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

        // 공고 데이터 조회 (프론트엔드 NoticeListItem에서 사용하는 필드만 선택)
        const { data: noticesData, error: noticesError } = await supabaseClient
            .from("notices")
            .select(
                `
                    id, title, category, description, original_url, 
                    start_date, end_date, supervising_institution, regional_institution
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
}
