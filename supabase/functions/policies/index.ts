import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
};

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
            .select("id, title, category, target_group, description", { count: "exact" })
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
        const transformedData = (data || []).map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            targetGroup: item.target_group,
            description: item.description,
        }));

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
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                data: [],
                total: 0,
                message: error.message || "Internal server error",
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
