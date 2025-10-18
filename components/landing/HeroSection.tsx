import Link from "next/link"
import { ArrowRight, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
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
            <Link href="#samples">
                <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                See samples
              </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
