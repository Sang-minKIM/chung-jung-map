import { createClient } from 'supabase'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Parse query parameters
    const url = new URL(req.url)
    const category = url.searchParams.get('category')
    const searchQuery = url.searchParams.get('q')
    const pageParam = url.searchParams.get('page')
    
    // Parse page parameter with default value
    const page = pageParam ? parseInt(pageParam, 10) : 1
    if (isNaN(page) || page < 1) {
      return new Response(
        JSON.stringify({ error: 'Invalid page parameter' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Calculate pagination
    const itemsPerPage = 20
    const offset = (page - 1) * itemsPerPage

    // Build query
    let query = supabase
      .from('policies')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + itemsPerPage - 1)

    // Apply category filter if provided
    if (category) {
      query = query.eq('category', category)
    }

    // Apply search filter if provided
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,content_summary.ilike.%${searchQuery}%`)
    }

    // Execute query
    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Database query failed' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Get total count for pagination info
    let totalCount = 0
    if (data && data.length > 0) {
      const countQuery = supabase
        .from('policies')
        .select('*', { count: 'exact', head: true })
      
      if (category) {
        countQuery.eq('category', category)
      }
      
      if (searchQuery) {
        countQuery.or(`title.ilike.%${searchQuery}%,content_summary.ilike.%${searchQuery}%`)
      }
      
      const { count: totalCountResult } = await countQuery
      totalCount = totalCountResult || 0
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    const hasNextPage = page < totalPages
    const hasPreviousPage = page > 1

    // Return successful response
    return new Response(
      JSON.stringify({
        data: data || [],
        pagination: {
          page,
          itemsPerPage,
          totalItems: totalCount,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
        filters: {
          category: category || null,
          searchQuery: searchQuery || null,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})