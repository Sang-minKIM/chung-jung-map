import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
};

interface PolicyRow {
    id: number;
    title: string;
    category: string;
    description: string;
}

interface PolicyDetailRow {
    id: number;
    title: string;
    category: string;
    sub_category: string;
    target_group: string;
    description: string;
    application_process: string | null;
    created_at: string;
}

// 정책 리스트용 변환 함수
function transformPolicyToResponse(policy: PolicyRow) {
    return {
        id: policy.id,
        title: policy.title,
        category: policy.category,
        description: policy.description,
    };
}

// 정책 상세용 변환 함수
function transformPolicyDetailToResponse(policy: PolicyDetailRow) {
    return {
        id: policy.id,
        title: policy.title,
        category: policy.category,
        subCategory: policy.sub_category,
        targetGroup: policy.target_group,
        description: policy.description,
    };
}

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    // Only allow GET requests
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

        // /functions/v1/policies/{id} 형태에서 마지막 세그먼트가 ID인지 확인
        const lastSegment = pathSegments[pathSegments.length - 1];
        const isDetailRequest = lastSegment !== "policies" && !isNaN(parseInt(lastSegment));

        if (isDetailRequest) {
            // 정책 상세 요청 처리
            return await handlePolicyDetail(url, pathSegments);
        } else {
            // 정책 리스트 요청 처리
            return await handlePolicyList(url);
        }
    } catch (error) {
        console.error("정책 API 오류:", error.message);
        return new Response(
            JSON.stringify({
                error: error.message,
                details: "정책 API 처리 중 오류가 발생했습니다.",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});

// 정책 상세 처리 함수
async function handlePolicyDetail(url: URL, pathSegments: string[]) {
    const policyIdStr = pathSegments[pathSegments.length - 1];

    if (!policyIdStr) {
        return new Response(
            JSON.stringify({
                error: "정책 ID가 필요합니다.",
                message: "URL 형식: /policies/{id}",
            }),
            {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    const policyId = parseInt(policyIdStr);

    if (isNaN(policyId) || policyId <= 0) {
        return new Response(
            JSON.stringify({
                error: "유효하지 않은 정책 ID입니다.",
                providedId: policyIdStr,
            }),
            {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    console.log(`정책 상세 조회 요청 - ID: ${policyId}`);

    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Missing required environment variables");
    }

    // Supabase 클라이언트 생성
    const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    // 정책 상세 데이터 조회
    const { data: policyData, error: policyError } = await supabaseClient
        .from("policies")
        .select(
            `
            id, title, category, sub_category, target_group, description,
            application_process, created_at
        `
        )
        .eq("id", policyId)
        .single();

    if (policyError) {
        if (policyError.code === "PGRST116") {
            return new Response(
                JSON.stringify({
                    error: "정책을 찾을 수 없습니다.",
                    policyId: policyId,
                }),
                {
                    status: 404,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }
        throw new Error(`정책 조회 실패: ${policyError.message}`);
    }

    if (!policyData) {
        return new Response(
            JSON.stringify({
                error: "정책을 찾을 수 없습니다.",
                policyId: policyId,
            }),
            {
                status: 404,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    console.log(`정책 상세 조회 성공 - ID: ${policyId}, 제목: ${policyData.title}`);

    // 응답 데이터 구성 (상세용 변환 함수 사용)
    const response = transformPolicyDetailToResponse(policyData);

    return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
    });
}

// 정책 리스트 처리 함수
async function handlePolicyList(url: URL) {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Missing required environment variables");
    }

    // Create Supabase client with service role key (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Build query to return all policies - no filtering or pagination
    // Client-side filtering will handle category, search, etc.
    const query = supabase
        .from("policies")
        .select("id, title, category, description", { count: "exact" })
        .order("created_at", { ascending: false });

    // Execute query
    const { data, error, count } = await query;

    if (error) {
        console.error("Database error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                data: [],
                total: 0,
                message: `Database query failed: ${error.message}`,
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    const total = count || 0;

    console.log(`Query successful: ${data?.length} policies returned (total: ${total})`);

    // Transform data to camelCase for response
    const transformedData = (data || []).map(transformPolicyToResponse);

    // Return successful response
    return new Response(
        JSON.stringify({
            success: true,
            data: transformedData,
            total,
            message: `Successfully fetched all ${transformedData.length} policies`,
        }),
        {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
    );
}
