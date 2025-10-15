import Link from "next/link"
import { ArrowRight, Check, Play, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { mockSlides, benefits, howItWorksSteps, faqItems } from "@/lib/mock"

export const metadata = {
  title: "App Store Screenshot Copy Generator - Ready in 60 Seconds",
  description:
    "Generate concise, benefit-driven lines for each screenshot. Ready to test in minutes. Conversion-focused copy with one-click export.",
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI-Powered Screenshot Copy
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-balance">
            App Store screenshot copy in 60 seconds
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
            Generate concise, benefit-driven lines for each screenshot. Ready to test in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/studio">
                Start free (3 credits)
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">
                <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                Watch demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-20 md:py-32 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="flex flex-col items-start">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Check className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-balance">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">How it works</h2>
            <p className="text-lg text-muted-foreground text-pretty">Three simple steps to conversion-ready copy</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-balance">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Preview Section */}
      <section className="container py-20 md:py-32 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">See it in action</h2>
            <p className="text-lg text-muted-foreground text-pretty">Choose your tone and see how the copy adapts</p>
          </div>

          <Tabs defaultValue="neutral" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="neutral">Neutral</TabsTrigger>
              <TabsTrigger value="persuasive">Persuasive</TabsTrigger>
              <TabsTrigger value="humorous">Humorous</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            {Object.entries(mockSlides).map(([tone, slides]) => (
              <TabsContent key={tone} value={tone} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  {slides.map((slide) => (
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
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Pricing Teaser Section */}
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

            {/* Pro Plan */}
            <Card className="border-accent/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For serious app developers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$20</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3" role="list">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">100 credits per month</span>
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
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">Custom tone training</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/pricing">Upgrade to Pro</Link>
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

      {/* FAQ Section */}
      <section className="container py-20 md:py-32 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">Everything you need to know</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger className="text-left text-balance">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-pretty">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="demo" className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            Ready to boost your App Store conversions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Start generating screenshot copy in seconds. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/studio">
                Start free (3 credits)
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                View pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
