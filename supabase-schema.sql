-- Supabase 데이터베이스 스키마
-- 이 파일을 Supabase SQL Editor에서 실행하세요

-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- profiles 테이블 (Supabase Auth와 연동)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  credits INTEGER DEFAULT 5,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- generations 테이블
CREATE TABLE IF NOT EXISTS generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  screenshot_url TEXT,
  app_description TEXT NOT NULL,
  target_audience TEXT,
  generated_copies JSONB NOT NULL, -- 생성된 카피들 저장
  credits_used INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- transactions 테이블 (결제 관리)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  amount DECIMAL(10,2),
  credits_added INTEGER,
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'pending', -- 'completed', 'pending', 'failed'
  created_at TIMESTAMP DEFAULT NOW()
);

-- screenshot_uploads 테이블 (기존 호환성을 위해 유지)
CREATE TABLE IF NOT EXISTS screenshot_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  file_key TEXT NOT NULL,
  content_type TEXT,
  size INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- copy_feedback 테이블 (사용자 피드백 저장)
CREATE TABLE IF NOT EXISTS copy_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  generation_id UUID REFERENCES generations(id) ON DELETE SET NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  copy_index INTEGER NOT NULL,
  user_rating INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security 설정
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshot_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE copy_feedback ENABLE ROW LEVEL SECURITY;

-- 정책: 사용자는 자신의 데이터만 접근
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view own generations"
  ON generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own uploads"
  ON screenshot_uploads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own uploads"
  ON screenshot_uploads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback"
  ON copy_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own feedback"
  ON copy_feedback FOR SELECT
  USING (auth.uid() = user_id);

-- 새 사용자 자동 생성 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, credits, plan)
  VALUES (NEW.id, NEW.email, 3, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger 설정 (새 사용자 가입 시 자동으로 프로필 생성)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage 버킷 생성 (스크린샷 저장용)
INSERT INTO storage.buckets (id, name, public)
VALUES ('screenshots', 'screenshots', false)
ON CONFLICT (id) DO NOTHING;

-- Storage 정책 (사용자는 자신의 파일만 접근)
CREATE POLICY "Users can upload own screenshots"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own screenshots"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own screenshots"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);