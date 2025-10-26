import { mockSlides } from "@/lib/mock"
import { CustomTabs } from "./CustomTabs"

export function SamplePreviewSection() {
  return (
    <section id="samples" className="container w-full mx-auto py-20 md:py-32 bg-muted/30 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">See it in action</h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">Choose your tone and see how the copy adapts</p>
        </div>

        <CustomTabs tabsData={mockSlides} />
      </div>
    </section>
  )
}