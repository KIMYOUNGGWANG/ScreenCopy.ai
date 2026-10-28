'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const tiers = [
  {
    name: 'Starter',
    id: 'starter',
    href: '#',
    priceMonthly: 9.99,
    credits: 10,
    description: '가볍게 시작하는 당신을 위한 플랜',
    features: ['10 크레딧', '크레딧 만료 없음', '기본 지원'],
    featured: false,
    priceId: 'price_1Pj9YkRpHK3nI4qHeC6a7g2g', // TODO: Replace with your actual Stripe Price ID
  },
  {
    name: 'Pro',
    id: 'pro',
    href: '#',
    priceMonthly: 39.99,
    credits: 50,
    description: '자주 사용하는 전문가를 위한 플랜',
    features: ['50 크레딧 (20% 할인)', '크레딧 만료 없음', '우선 지원', '베타 기능 접근'],
    featured: true,
    priceId: 'price_1Pj9ZWRpHK3nI4qHnQdKUKb3', // TODO: Replace with your actual Stripe Price ID
  },
  {
    name: 'Agency',
    id: 'agency',
    href: '#',
    priceMonthly: 149.99,
    credits: 200,
    description: '여러 앱을 관리하는 에이전시를 위한 플랜',
    features: ['200 크레딧 (25% 할인)', '크레딧 만료 없음', '전담 지원', '팀 협업 기능 (예정)'],
    featured: false,
    priceId: 'price_1Pj9aQRpHK3nI4qHnQdKUKb4', // TODO: Replace with your actual Stripe Price ID
  },
]

interface PricingTableProps {
  currentCredits: number
}

export default function PricingTable({ currentCredits }: PricingTableProps) {
  const [loading, setLoading] = useState(false)

  const handlePurchase = async (tierName: string, price: number, credits: number, priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/provision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, credits }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '결제 세션 생성에 실패했습니다.')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      } else {
        throw new Error('결제 URL을 받아오지 못했습니다.')
      }
    } catch (error: any) {
      toast.error('결제 오류', {
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-5xl lg:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.id}
          className={cn(
            'flex flex-col rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-gray-800',
            tier.featured ? 'ring-2 ring-primary dark:ring-primary' : ''
          )}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-x-4">
              <h3
                id={tier.id}
                className={cn(
                  'text-lg font-semibold leading-8',
                  tier.featured ? 'text-primary' : 'text-foreground'
                )}
              >
                {tier.name}
              </h3>
              {tier.name === 'Pro' && (
                <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                  인기
                </p>
              )}
            </CardTitle>
            <CardDescription className="mt-4 text-sm leading-6 text-muted-foreground">
              {tier.description}
            </CardDescription>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight">
                ${tier.priceMonthly}
              </span>
              <span className="text-sm font-semibold leading-6 text-muted-foreground">
                / 일회성
              </span>
            </p>
          </CardHeader>
          <CardContent className="flex-1">
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-6">
            <Button
              aria-describedby={tier.id}
              className={cn(
                'w-full',
                tier.featured ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted-foreground/10 text-foreground hover:bg-muted-foreground/20'
              )}
              onClick={() => handlePurchase(tier.name, tier.priceMonthly, tier.credits, tier.priceId)}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {tier.credits} 크레딧 구매
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}