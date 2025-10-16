"use client"

import { AccountCard } from "@/components/AccountCard"
import { mockAccount } from "@/lib/mock"
import { useEffect } from "react";
import { supaBrowser } from "@/lib/supa-browser";

export default function AccountPage() {
  const supa = supaBrowser();

  useEffect(() => {
    const { data: sub } = supa.auth.onAuthStateChange(async (e, session) => {
      if (session?.user) {
        await fetch("/api/provision", { method: "POST" }); // 최초 로그인 시 5크레딧
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [supa]);
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Account Settings</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            View your plan, manage your data, and control your account preferences
          </p>
        </div>

        {/* Account Card */}
        <AccountCard plan={mockAccount.plan} credits={mockAccount.credits} />
      </div>
    </div>
  )
}
