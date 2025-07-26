-- pg_cron 확장 활성화 (Supabase에서는 기본적으로 활성화되어 있음)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- LH 공고 수집 작업을 매시 정각에 실행하도록 스케줄링
-- cron 표현식: '0 * * * *' = 매시 0분 (정각)
SELECT cron.schedule(
  'collect-lh-notices-hourly',
  '0 * * * *',
  $$
  SELECT
    net.http_post(
      url := (SELECT CONCAT(current_setting('app.settings.supabase_url'), '/functions/v1/collect-lh-notices-from-api')),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', CONCAT('Bearer ', current_setting('app.settings.supabase_service_role_key'))
      ),
      body := jsonb_build_object('scheduled', true)
    ) as request_id;
  $$
);

-- 선택사항: 매일 오전 9시에 실행하는 일일 스케줄도 추가
SELECT cron.schedule(
  'collect-lh-notices-daily',
  '0 9 * * *',
  $$
  SELECT
    net.http_post(
      url := (SELECT CONCAT(current_setting('app.settings.supabase_url'), '/functions/v1/collect-lh-notices-from-api')),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', CONCAT('Bearer ', current_setting('app.settings.supabase_service_role_key'))
      ),
      body := jsonb_build_object('scheduled', true, 'type', 'daily')
    ) as request_id;
  $$
);

-- 스케줄된 작업 확인을 위한 뷰 생성
CREATE OR REPLACE VIEW scheduled_jobs AS
SELECT 
  jobid,
  schedule,
  command,
  nodename,
  nodeport,
  database,
  username,
  active,
  jobname
FROM cron.job
WHERE jobname LIKE 'collect-lh-notices%';

-- 작업 로그를 위한 테이블 생성 (선택사항)
CREATE TABLE IF NOT EXISTS lh_collection_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('running', 'completed', 'failed')),
  result JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 로그 테이블에 RLS 활성화
ALTER TABLE lh_collection_logs ENABLE ROW LEVEL SECURITY;

-- 로그 정리를 위한 함수 (30일 이상 된 로그 삭제)
CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM lh_collection_logs 
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$;

-- 매일 자정에 오래된 로그 정리
SELECT cron.schedule(
  'cleanup-lh-logs',
  '0 0 * * *',
  'SELECT cleanup_old_logs();'
);