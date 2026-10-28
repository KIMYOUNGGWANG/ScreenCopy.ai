import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    { name: '스튜디오', href: '/studio' },
    { name: '히스토리', href: '/history' },
    { name: '가격', href: '/pricing' },
  ]

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
              pathname === item.href ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
