# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트 생성
2. 프로젝트 이름: `screenshot-copy-ai`
3. 데이터베이스 비밀번호 설정 (안전한 비밀번호 사용)

## 2. 데이터베이스 스키마 설정

1. Supabase 대시보드 → SQL Editor로 이동
2. `supabase-schema.sql` 파일의 내용을 복사해서 실행
3. 실행 후 테이블들이 생성되었는지 확인:
   - `profiles`
   - `generations` 
   - `transactions`
   - `screenshot_uploads`

## 3. Google OAuth 설정

### 3.1 Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **APIs & Services** → **Credentials** 이동
4. **Create Credentials** → **OAuth 2.0 Client ID** 선택
5. Application type: **Web application**
6. Authorized redirect URIs 추가:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
   - `your-project-ref`는 Supabase 프로젝트 URL에서 확인

### 3.2 Supabase에서 Google Provider 활성화

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Google** 활성화
3. Google Cloud Console에서 받은 정보 입력:
   - **Client ID**: Google OAuth 클라이언트 ID
   - **Client Secret**: Google OAuth 클라이언트 시크릿

## 4. 환경 변수 설정

`.env.local` 파일 생성:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# App URL (개발용)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 환경 변수 찾는 방법:
1. Supabase 대시보드 → **Settings** → **API**
2. **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## 5. Storage 설정

1. Supabase 대시보드 → **Storage**
2. 새 버킷 생성:
   - **Name**: `screenshots`
   - **Public bucket**: ❌ (비공개)
   - **File size limit**: 50MB
   - **Allowed MIME types**: `image/*`

## 6. 이메일 인증 설정 (선택사항)

1. Supabase 대시보드 → **Authentication** → **Settings**
2. **Enable email confirmations** 활성화
3. **Site URL** 설정: `http://localhost:3000` (개발용)
4. **Redirect URLs** 추가: `http://localhost:3000/auth/callback`

## 7. 보안 설정

### 7.1 Row Level Security 확인
- SQL Editor에서 RLS 정책이 올바르게 설정되었는지 확인

### 7.2 CORS 설정
- Supabase 대시보드 → **Settings** → **API**
- **Additional redirect URLs**에 개발/프로덕션 URL 추가

## 8. 테스트

1. 개발 서버 실행: `npm run dev`
2. `/auth/signup`에서 회원가입 테스트
3. Google 로그인 테스트
4. 이메일 인증 테스트

## 문제 해결

### Google OAuth 오류
- Redirect URI가 정확한지 확인
- Google Cloud Console에서 도메인 인증 상태 확인

### 데이터베이스 연결 오류
- 환경 변수가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

### 이메일 인증 문제
- Supabase에서 이메일 템플릿 확인
- 스팸 폴더 확인
