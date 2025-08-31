CREATE FUNCTION public.search_similar_notices(
    query_embedding vector,
    similarity_threshold double precision,
    match_count integer,
    offset_count integer
)
RETURNS TABLE(
    id integer,
    title text,
    category text,
    description text,
    original_url text,
    start_date text,
    end_date text,
    supervising_institution text,
    regional_institution text,
    similarity double precision
)
LANGUAGE sql
AS $$
  SELECT
    n.id,
    n.title,
    n.category,
    n.description,
    n.original_url,
    n.start_date, 
    n.end_date,   
    n.supervising_institution,
    n.regional_institution,
    1 - (n.vector <=> query_embedding) AS similarity
  FROM notices n
  WHERE
      n.vector IS NOT NULL
      AND 1 - (n.vector <=> query_embedding) >= similarity_threshold
  ORDER BY similarity
  LIMIT match_count
  OFFSET offset_count;
$$;