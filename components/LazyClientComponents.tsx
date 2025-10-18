'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Toaster = dynamic(() => import('@/components/ui/toaster').then(mod => mod.Toaster), { ssr: false })

export function LazyClientComponents() {
  return (
    <>
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
    </>
  )
}
