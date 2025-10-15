"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out our screenshot copy generator",
    features: ["3 generations/month", "English output", "5-slide default", "CSV/JSON export"],
    cta: "Start free",
    ctaHref: "/studio",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professionals who need unlimited generations and advanced features",
    features: ["Unlimited (fair use)", "3/5/7 slides", "A/B/C variants", "English + multilingual (coming soon)"],
    cta: "Upgrade to Pro",
    ctaHref: "/account",
    highlighted: true,
  },
]

export function PricingTable() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative ${plan.highlighted ? "border-accent shadow-lg shadow-accent/20" : "border-border/50"}`}
        >
          {plan.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                Most Popular
              </span>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            <CardDescription className="mt-4 leading-relaxed">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3" role="list">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} size="lg" asChild>
              <Link href={plan.ctaHref}>{plan.cta}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
