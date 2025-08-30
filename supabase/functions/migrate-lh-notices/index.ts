import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // Initialize Supabase client
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        console.log("🏢 Starting LH notices migration...");

        const LH_INSTITUTION_NAME = "한국토지주택공사";

        // 한국토지주택공사가 source인 notices 조회
        const { data: lhNotices, error: fetchError } = await supabase
            .from("notices")
            .select("id, title, source, supervising_institution, registering_institution, operating_institution")
            .eq("source", LH_INSTITUTION_NAME);

        if (fetchError) {
            console.error("❌ Error fetching LH notices:", fetchError);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Failed to fetch LH notices",
                    details: fetchError.message,
                }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        if (!lhNotices || lhNotices.length === 0) {
            console.log("ℹ️ No LH notices found to migrate");
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "No LH notices found to migrate",
                    processed: 0,
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        console.log(`📊 Found ${lhNotices.length} LH notices to migrate`);

        let updatedCount = 0;
        let skippedCount = 0;

        // 각 LH notice 업데이트
        for (const notice of lhNotices) {
            // 이미 모든 기관 정보가 설정되어 있는지 확인
            const needsUpdate =
                !notice.supervising_institution ||
                !notice.registering_institution ||
                !notice.operating_institution ||
                notice.supervising_institution !== LH_INSTITUTION_NAME ||
                notice.registering_institution !== LH_INSTITUTION_NAME ||
                notice.operating_institution !== LH_INSTITUTION_NAME;

            if (!needsUpdate) {
                skippedCount++;
                continue;
            }

            console.log(`🔄 Updating notice ID: ${notice.id} - "${notice.title}"`);

            const { error: updateError } = await supabase
                .from("notices")
                .update({
                    supervising_institution: LH_INSTITUTION_NAME,
                    registering_institution: LH_INSTITUTION_NAME,
                    operating_institution: LH_INSTITUTION_NAME,
                })
                .eq("id", notice.id);

            if (updateError) {
                console.error(`❌ Error updating notice ${notice.id}:`, updateError);
                continue;
            }

            updatedCount++;

            // 부하 방지를 위한 짧은 지연
            await new Promise((resolve) => setTimeout(resolve, 10));
        }

        console.log(`✅ Migration completed! Updated: ${updatedCount}, Skipped: ${skippedCount}`);

        return new Response(
            JSON.stringify({
                success: true,
                message: `LH notices migration completed successfully`,
                total_found: lhNotices.length,
                updated: updatedCount,
                skipped: skippedCount,
                institution_name: LH_INSTITUTION_NAME,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("❌ Unexpected error during migration:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: "Internal server error",
                details: error.message,
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
