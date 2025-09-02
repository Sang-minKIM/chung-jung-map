-- 지역관할기관 컬럼 추가
-- 등록최상위기관(rgtrHghrkInstCdNm)을 지역관할기관으로 사용

-- 지역관할기관 컬럼 추가
ALTER TABLE notices ADD COLUMN IF NOT EXISTS regional_authority text;

-- 컬럼 설명 추가
COMMENT ON COLUMN notices.regional_authority IS '지역관할기관 (rgtrHghrkInstCdNm) - 등록최상위기관, 지역기관 또는 국가 산하기관';

-- registering_institution 컬럼은 등록기관(rgtrInstCdNm)으로 계속 사용
-- regional_authority는 새로운 필드 rgtrHghrkInstCdNm으로 채워질 예정
