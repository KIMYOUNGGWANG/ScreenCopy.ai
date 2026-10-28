"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

interface StudioFormProps {
  onGenerate: (data: FormData) => void
  isGenerating: boolean
}

export interface FormData {
  appDescription: string
  targetAudience: string
  hypothesisTags: {
    socialProof: boolean
    stability: boolean
    price: boolean
    speed: boolean
  }
}

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import UploadBox from './UploadBox'
import { type GenerationResult } from '@/app/studio/studio-client-page'

const formSchema = z.object({
  screenshotFile: z.any().refine(file => file, '스크린샷을 업로드해주세요.'),
  appName: z.string().min(1, '앱 이름을 입력해주세요.'),
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  targetAudience: z.string().min(1, '주요 사용자 유형을 선택해주세요.'),
  painPoint: z.string().max(100, '100자 이내로 입력해주세요.'),
  screenDescription: z.string().min(1, '화면 설명을 입력해주세요.').max(200, '200자 이내로 입력해주세요.'),
  keyBenefit: z.string().min(1, '핵심 혜택을 입력해주세요.').max(100, '100자 이내로 입력해주세요.'),
  tone: z.string().min(1, '카피 스타일을 선택해주세요.'),
})

type StudioFormValues = z.infer<typeof formSchema>

interface StudioFormProps {
  credits: number
  setIsLoading: (isLoading: boolean) => void
  setGeneratedCopy: (copy: GenerationResult[] | null) => void
  setUploadedScreenshotUrl: (url: string | null) => void
  setGenerationId: (id: string | null) => void // New prop
}

export default function StudioForm({
  credits,
  setIsLoading,
  setGeneratedCopy,
  setUploadedScreenshotUrl,
  setGenerationId,
}: StudioFormProps) {
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<StudioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appName: '',
      category: '',
      targetAudience: '',
      painPoint: '',
      screenDescription: '',
      keyBenefit: '',
      tone: 'Professional',
    },
  })

  const onSubmit = async (values: StudioFormValues) => {
    if (credits <= 0) {
      toast.error('크레딧이 부족합니다.', {
        description: '크레딧을 충전해주세요.',
      })
      return
    }
    
    setIsLoading(true)
    setGeneratedCopy(null)
    setUploadedScreenshotUrl(null)
    setGenerationId(null) // Reset generationId

    try {
      // 1. Get signed URL for upload
      const signedUrlResponse = await fetch('/api/upload-url', {
        method: 'POST',
        body: JSON.stringify({
          filename: file!.name,
          contentType: file!.type,
        }),
      })
      if (!signedUrlResponse.ok) throw new Error('Failed to get signed URL.')
      const { signedUrl, fileKey } = await signedUrlResponse.json()

      // 2. Upload file to Supabase Storage
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file!.type },
      })
      if (!uploadResponse.ok) throw new Error('Screenshot upload failed.')
      
      const uploadedUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/screenshots/${fileKey}`
      setUploadedScreenshotUrl(uploadedUrl)

      // 3. Call generate API
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ ...values, screenshotUrl: uploadedUrl }),
      })
      if (!generateResponse.ok) {
        const errorData = await generateResponse.json()
        throw new Error(errorData.error || 'Failed to generate copy.')
      }

      const { data, generationId: newGenerationId } = await generateResponse.json()
      setGeneratedCopy(data)
      setGenerationId(newGenerationId) // Set the new generationId
      toast.success('카피가 생성되었습니다!')
    } catch (error: any) {
      toast.error('오류가 발생했습니다.', {
        description: error.message,
      })
      setGeneratedCopy(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-2xl font-bold mb-2">ScreenCopy.ai 스튜디오</h2>
      <p className="text-muted-foreground mb-6">
        앱 스크린샷과 정보를 입력하면 AI가 완벽한 마케팅 문구를 생성해줍니다.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="screenshotFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. 앱 스크린샷 업로드</FormLabel>
                <FormControl>
                  <UploadBox 
                    onFileChange={(file) => {
                      field.onChange(file)
                      setFile(file)
                    }} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">2. 컨텍스트 입력</h3>
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>앱 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="예: ScreenCopy.ai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="앱의 카테고리를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Game">Game</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                      <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>주요 사용자</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="주요 사용자 유형을 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                      <SelectItem value="Gamer">Gamer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="painPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>해결하는 문제</FormLabel>
                  <FormControl>
                    <Input placeholder="사용자의 어떤 문제를 해결해주나요? (100자 이내)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="screenDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>스크린샷 설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="이 스크린샷이 보여주는 핵심 기능이나 화면을 설명해주세요. (200자 이내)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyBenefit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>강조하고 싶은 혜택</FormLabel>
                  <FormControl>
                    <Input placeholder="이 화면을 통해 사용자가 얻는 가장 큰 혜택은 무엇인가요? (100자 이내)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카피 스타일</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="원하는 카피의 톤을 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Professional">Professional (전문적인)</SelectItem>
                      <SelectItem value="Casual">Casual (캐주얼한)</SelectItem>
                      <SelectItem value="Playful">Playful (재미있는)</SelectItem>
                      <SelectItem value="Inspirational">Inspirational (영감을 주는)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting || credits <= 0}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                생성 중...
              </>
            ) : (
              `카피 생성하기 (남은 크레딧: ${credits})`
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

