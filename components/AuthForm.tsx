'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { sendWelcomeEmail } from '@/lib/email' // Import sendWelcomeEmail

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Chrome } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해주세요.' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
})

type UserAuthFormValues = z.infer<typeof formSchema>

export default function AuthForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const form = useForm<UserAuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
    if (error) {
      toast.error('로그인 중 오류가 발생했습니다.', {
        description: error.message,
      })
      setLoading(false)
    }
  }

  const onSubmit = async (values: UserAuthFormValues) => {
    setLoading(true)
    
    // First, try to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword(values)

    if (signInError) {
      // If sign-in fails, try to sign up
      const { error: signUpError } = await supabase.auth.signUp(values)

      if (signUpError) {
        toast.error('로그인/회원가입 중 오류가 발생했습니다.', {
          description: signUpError.message,
        })
        setLoading(false)
      } else {
        // Send welcome email after successful sign-up
        await sendWelcomeEmail(values.email)
        toast.success('회원가입 성공!', {
          description: '인증 메일을 확인해주세요.',
        })
        router.push('/')
      }
    } else {
      toast.success('로그인 성공!')
      router.push('/studio')
    }
  }

  return (
    <div className="grid gap-6">
      <Button variant="outline" type="button" disabled={loading} onClick={handleGoogleSignIn}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Chrome className="mr-2 h-4 w-4" />
        )}{' '}
        Google 계정으로 로그인
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            또는 이메일로 계속하기
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일 주소</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="name@example.com" 
                    {...field} 
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="비밀번호" 
                    {...field} 
                    type="password"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            로그인 또는 회원가입
          </Button>
        </form>
      </Form>
    </div>
  )
}
