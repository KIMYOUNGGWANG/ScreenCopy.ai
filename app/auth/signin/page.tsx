import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export const metadata = {
  title: '로그인',
  description: 'ScreenCopy.ai에 로그인하거나 가입하세요.',
}

export default function AuthenticationPage() {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1596003906917-24a881575353?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          ScreenCopy.ai
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;이 도구 덕분에 앱스토어 스크린샷 만드는 시간이 며칠에서 몇 분으로 줄었어요. 마케팅에 자신감이 생겼습니다!&rdquo;
            </p>
            <footer className="text-sm">Solo Steve, 1인 개발자</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              계정 만들기 또는 로그인
            </h1>
            <p className="text-sm text-muted-foreground">
              이메일 주소를 입력하여 시작하세요.
            </p>
          </div>
          <AuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            계속 진행하면 ScreenCopy.ai의{' '}
            <Link
              href="/legal/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              서비스 이용약관
            </Link>
            {' '}및{' '}
            <Link
              href="/legal/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              개인정보 보호정책
            </Link>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
