import Link from "next/link"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingTeaserSection() {
  return (
    <section className="container py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">Start free, upgrade when you need more</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Free Plan */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Perfect for trying it out</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">3 free credits to start</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">All tone variations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">CSV/JSON export</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">Basic support</span>
                </li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline" asChild>
                <Link href="/studio">Start free</Link>
              </Button>
            </CardContent>
          </Card>

          {/* 250 Credits Pack */}
          <Card className="border-accent/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">250 Credits</CardTitle>
              <CardDescription>Best value for frequent users.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-muted-foreground"> one-time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">250 generations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">One-time purchase</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">Access to all features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/pricing">Purchase Credits</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button variant="link" asChild>
            <Link href="/pricing">
              View all pricing options
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
