'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from '@/lib/utils'

interface TabData {
  [key: string]: {
    id: number
    title: string
    subtitle: string
    callout: string
  }[]
}

interface CustomTabsProps {
  tabsData: TabData
}

export function CustomTabs({ tabsData }: CustomTabsProps) {
  const tabKeys = Object.keys(tabsData)
  const [activeTab, setActiveTab] = useState(tabKeys[0])

  const activeSlides = tabsData[activeTab]

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 bg-muted text-muted-foreground rounded-lg p-[3px]">
        {tabKeys.map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={cn(
              "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              activeTab === tabKey ? "bg-background text-foreground shadow-sm" : "hover:bg-muted/50"
            )}
          >
            {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {activeSlides.map((slide) => (
            <Card key={slide.id} className="border-border/50">
              <CardHeader>
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent w-fit">
                  {slide.callout}
                </div>
                <CardTitle className="text-lg text-balance">{slide.title}</CardTitle>
                <CardDescription className="leading-relaxed text-pretty">{slide.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[9/16] rounded-md bg-muted/50 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Screenshot {slide.id}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
