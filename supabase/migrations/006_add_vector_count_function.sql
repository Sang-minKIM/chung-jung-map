-- 벡터 유사도 검색 결과의 총 개수를 조회하는 함수 생성
-- count_similar_notices: threshold에 해당하는 전체 공고 개수를 반환

CREATE OR REPLACE FUNCTION public.count_similar_notices(
    query_embedding vector, 
    similarity_threshold double precision
)
RETURNS integer
LANGUAGE sql 
STABLE
AS $function$
    SELECT COUNT(*)::integer
    FROM notices n
    WHERE 
        n.vector IS NOT NULL 
        AND 1 - (n.vector <=> query_embedding) >= similarity_threshold;
$function$;

-- 함수 설명 추가
COMMENT ON FUNCTION public.count_similar_notices(vector, double precision) IS 
'주어진 벡터와 유사도 임계값에 해당하는 공고의 총 개수를 반환합니다. 페이지네이션을 위한 totalCount 계산에 사용됩니다.';
