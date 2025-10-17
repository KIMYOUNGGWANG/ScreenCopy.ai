"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Moon, Sun, Menu, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { supaBrowser } from "@/lib/supa-browser"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import logo from "@/public/placeholder-logo.svg"

type SiteHeaderProps = {
  /** When user is logged in, show remaining credits */
  credits?: number | null
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Studio", href: "/studio" },
  { name: "Pricing", href: "/pricing" },
  { name: "Account", href: "/account" },
]

export function SiteHeader({ credits }: SiteHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userCredits, setUserCredits] = useState<number | null>(credits ?? null)

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  useEffect(() => {
    const supabase = supaBrowser()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        // Fetch user credits when logged in
        fetchUserCredits(session.user)
      } else {
        setUserCredits(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserCredits = async (user: SupabaseUser) => {
    try {
      const supabase = supaBrowser()
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single()
      
      if (profile) {
        setUserCredits(profile.credits)
      }
    } catch (error) {
      console.error("Error fetching credits:", error)
    }
  }

  const handleSignOut = async () => {
    const supabase = supaBrowser()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg" aria-label="Go to home">
            <Image src={logo} alt="Screenshot Copy Logo" width={32} height={32} priority className="h-8 w-8" />
            <span className="hidden sm:inline-block">Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    pathname === item.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          {/* Credits badge (only when user is logged in) */}
          {user && typeof userCredits === "number" && (
            <span
              className="rounded-full border px-3 py-1 text-xs font-medium"
              aria-label={`Credits available: ${userCredits}`}
              title={`Credits: ${userCredits}`}
            >
              Credits: {userCredits}
            </span>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="h-9 w-9"
          >
            <>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </>
          </Button>

          {/* Auth buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block ml-2">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navigation.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </nav>
    </header>
  )
}
