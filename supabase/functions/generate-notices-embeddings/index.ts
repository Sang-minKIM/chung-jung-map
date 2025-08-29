import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Gemini API 키는 환경 변수에서 가져옵니다.
// supabase secrets set GEMINI_API_KEY your_gemini_api_key_here
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`;

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
    vector: number[] | null;
}

Deno.serve(async (req) => {
    // CORS Preflight 요청 처리
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        console.log("공고 벡터 생성 시작...");

        // Supabase 클라이언트 생성
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        // vector가 null인 모든 공고 가져오기
        const { data: notices, error: fetchError } = await supabaseClient
            .from("notices")
            .select("*")
            .is("vector", null)
            .order("id");

        if (fetchError) {
            throw new Error(`공고 조회 실패: ${fetchError.message}`);
        }

        if (!notices || notices.length === 0) {
            return new Response(
                JSON.stringify({
                    message: "벡터가 필요한 공고가 없습니다.",
                    processedCount: 0,
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 200,
                }
            );
        }

        console.log(`${notices.length}개의 공고에 대해 벡터 생성 시작`);

        let successCount = 0;
        let errorCount = 0;
        const errors: string[] = [];

        // 각 공고에 대해 벡터 생성 및 저장
        for (const notice of notices as NoticeRow[]) {
            try {
                console.log(`공고 ID ${notice.id} 처리 중...`);

                // 벡터화를 위한 텍스트 생성
                const embeddingInputText = [
                    `제목: ${notice.title || ""}`,
                    `카테고리: ${notice.category || ""}`,
                    `출처: ${notice.source || ""}`,
                    `내용 요약: ${notice.content_summary || ""}`,
                    `정책 번호: ${notice.policy_number || ""}`,
                    `신청 기간: ${notice.start_date || ""} ~ ${notice.end_date || ""}`,
                ]
                    .filter((text) => text.trim() !== "" && !text.endsWith(": "))
                    .join("\n")
                    .trim();

                if (!embeddingInputText) {
                    console.log(`공고 ID ${notice.id}: 벡터화할 텍스트가 없어 건너뜀`);
                    continue;
                }

                // Gemini API 호출하여 벡터 생성
                const geminiRes = await fetch(GEMINI_API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: "models/gemini-embedding-001",
                        content: {
                            parts: [{ text: embeddingInputText }],
                        },
                        task_type: "RETRIEVAL_DOCUMENT",
                        outputDimensionality: 768,
                    }),
                });

                if (!geminiRes.ok) {
                    const errorText = await geminiRes.text();
                    throw new Error(`Gemini API 에러: ${errorText}`);
                }

                const embeddingData = await geminiRes.json();

                if (!embeddingData.embedding || !embeddingData.embedding.values) {
                    throw new Error("벡터 데이터가 올바르지 않습니다");
                }

                const vector = embeddingData.embedding.values;

                // Supabase에 벡터 저장
                const { error: updateError } = await supabaseClient
                    .from("notices")
                    .update({ vector: vector })
                    .eq("id", notice.id);

                if (updateError) {
                    throw new Error(`DB 업데이트 실패: ${updateError.message}`);
                }

                successCount++;
                console.log(`공고 ID ${notice.id} 벡터 생성 완료 (${successCount}/${notices.length})`);

                // API 호출 제한을 위한 딜레이 (선택사항)
                if (successCount % 10 === 0) {
                    console.log(`${successCount}개 처리 완료, 1초 대기...`);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            } catch (error) {
                errorCount++;
                const errorMsg = `공고 ID ${notice.id} 처리 실패: ${error.message}`;
                console.error(errorMsg);
                errors.push(errorMsg);

                // 에러가 너무 많으면 중단
                if (errorCount > 10) {
                    console.error("에러가 너무 많아 처리를 중단합니다.");
                    break;
                }
            }
        }

        console.log(`벡터 생성 완료. 성공: ${successCount}, 실패: ${errorCount}`);

        // 성공 응답 반환
        return new Response(
            JSON.stringify({
                message: "공고 벡터 생성 완료!",
                processedCount: notices.length,
                successCount,
                errorCount,
                errors: errors.slice(0, 5), // 최대 5개의 에러만 반환
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        console.error("전체 프로세스 에러:", error.message);

        return new Response(
            JSON.stringify({
                error: error.message,
                details: "공고 벡터 생성 중 오류가 발생했습니다.",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
