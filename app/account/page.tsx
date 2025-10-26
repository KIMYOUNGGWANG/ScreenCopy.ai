"use client"

import { AccountCard } from "@/components/AccountCard"
import { useEffect, useState } from "react";
import { supaBrowser } from "@/lib/supa-browser";
import { User } from "@supabase/supabase-js";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define a type for the profile data
interface Profile {
  plan: "free" | "pro";
  credits: number;
}

export default function AccountPage() {
  const supa = supaBrowser();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (userToFetch: User) => {
      const { data, error } = await supa
        .from('profiles')
        .select('plan, credits')
        .eq('id', userToFetch.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message || error);
        setProfile(null); // Handle error case
      } else {
        setProfile(data as Profile);
      }
      setLoading(false);
    };

    const { data: authListener } = supa.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        await fetchProfile(currentUser);
      } else {
        setLoading(false);
        setProfile(null);
      }
    });

    // Initial fetch in case the auth state is already settled
    supa.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        if (!profile) { // Avoid re-fetching if profile is already there
          fetchProfile(user);
        }
      } else {
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supa]);

  return (
    <div className="container w-full py-12 md:py-20 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Account Settings</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            View your plan, manage your data, and control your account preferences
          </p>
        </div>

        {/* Account Card */}
        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-24 w-full" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ) : profile ? (
          <AccountCard plan={profile.plan} credits={profile.credits} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Please sign in</CardTitle>
              <CardDescription>Sign in to manage your account.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  )
}
