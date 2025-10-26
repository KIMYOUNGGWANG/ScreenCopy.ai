"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// TODO: Replace with your actual Stripe Price IDs
const plans = [
  {
    id: "launch_pack",
    name: "Launch Pack",
    price: "$5/mo",
    description: "Perfect for small projects and occasional use.",
    features: ["50 generations per month", "1-month credit rollover", "Access to all features"],
    cta: "Subscribe",
    priceId: "price_1Pj9YkRpHK3nI4qHeC6a7g2g", // Replace with your actual Price ID from Stripe
    highlighted: false,
  },
  {
    id: "update_pack",
    name: "Update Pack",
    price: "$20/mo",
    description: "Best value for frequent users and larger projects.",
    features: ["250 generations per month", "1-month credit rollover", "Access to all features", "Priority support"],
    cta: "Subscribe",
    priceId: "price_1Pj9ZWRpHK3nI4qHnQdKUKb3", // Replace with your actual Price ID from Stripe
    highlighted: true,
  },
]

export function PricingTable() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handlePurchase = async (priceId: string) => {
    setLoadingPriceId(priceId)
    setError("")
    try {
      const res = await fetch("/api/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      })

      if (!res.ok) {
        throw new Error("Failed to create checkout session.")
      }

      const { url } = await res.json()
      if (url) {
        window.location.href = url
      } else {
        throw new Error("Could not retrieve checkout URL.")
      }
    } catch (e: any) {
      setError(e?.message ?? "An unknown error occurred.")
      setLoadingPriceId(null)
    }
  }

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
            <Button 
              className="w-full"
              variant={plan.highlighted ? "default" : "outline"} 
              size="lg"
              onClick={() => handlePurchase(plan.priceId)}
              disabled={loadingPriceId === plan.priceId}
            >
              {loadingPriceId === plan.priceId ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
      {error && <p className="col-span-full text-center text-sm text-destructive">Error: {error}</p>}
    </div>
  )
}
