-- policies 테이블 생성
CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    source TEXT,
    original_url TEXT UNIQUE,
    start_date DATE,
    end_date DATE,
    content_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- subscribers 테이블 생성
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- policies 테이블에 RLS 활성화
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;

-- subscribers 테이블에 RLS 활성화
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;