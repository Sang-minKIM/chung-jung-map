-- Add supervising institution, registering institution columns and fix operating institution mapping
-- 주관기관, 등록기관 컬럼 추가 및 운영기관 매핑 수정

-- 주관기관, 등록기관 컬럼 추가
ALTER TABLE notices ADD COLUMN IF NOT EXISTS supervising_institution text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS registering_institution text;

-- 컬럼 설명 추가
COMMENT ON COLUMN notices.supervising_institution IS '주관기관 (sprvsnInstCdNm)';
COMMENT ON COLUMN notices.registering_institution IS '등록기관 (rgtrInstCdNm)';
COMMENT ON COLUMN notices.operating_institution IS '운영기관 (operInstCdNm)';
