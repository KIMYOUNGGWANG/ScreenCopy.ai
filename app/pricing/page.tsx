import type { Metadata } from "next";
import { PricingTable } from "@/components/PricingTable"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Pricing | Screenshot Copy Generator",
  description: "Choose a credit package that fits your needs. Start for free, then pay as you go.",
};

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-balance">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Start free and upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mb-16">
          <PricingTable />
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cancel">
              <AccordionTrigger className="text-left">Can I cancel anytime?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">Yes—month-to-month.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="teams">
              <AccordionTrigger className="text-left">Do you support teams?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Team features are on our roadmap.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment">
              <AccordionTrigger className="text-left">Is payment secure?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Cards are processed by Stripe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
