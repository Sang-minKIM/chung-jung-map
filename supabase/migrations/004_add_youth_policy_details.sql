-- Add detailed fields for youth policy data
-- 청년정책 상세 필드 추가

ALTER TABLE notices ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS support_content text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS additional_info text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS operating_institution text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS application_method text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS screening_method text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS required_documents text;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS reference_url text;

-- Add comments for documentation
COMMENT ON COLUMN notices.description IS '정책 설명 (plcyExplnCn)';
COMMENT ON COLUMN notices.support_content IS '지원 내용 (plcySprtCn)';
COMMENT ON COLUMN notices.additional_info IS '기타 내용 (etcMttrCn)';
COMMENT ON COLUMN notices.operating_institution IS '운영 기관 (opshrInsdNm)';
COMMENT ON COLUMN notices.application_method IS '신청 방법 (plcyAplyMthdCn)';
COMMENT ON COLUMN notices.screening_method IS '심사 방법 (srngMthdCn)';
COMMENT ON COLUMN notices.required_documents IS '제출 서류 (sbmsnDcmntCn)';
COMMENT ON COLUMN notices.reference_url IS '참고 URL (refUrlAddr1)';
