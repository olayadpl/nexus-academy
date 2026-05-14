"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Bookmark, Home, Menu, User } from "lucide-react"
import { cn } from "@/src/core/ui/lib/utils"
import { useLocale } from "@/src/core/ui/hooks/use-locale"
import { getTranslations } from "@/src/lib/i18n/translations"

export function MobileNav() {
  const pathname = usePathname()
  const { locale } = useLocale()
  const t = getTranslations(locale)

  const navItems = [
    { href: "/", label: t.mobileNav.home, icon: Home },
    { href: "/bookmarks", label: t.mobileNav.saved, icon: Bookmark },
    { href: "/explore", label: t.mobileNav.explore, icon: Compass },
    { href: "/menu", label: t.mobileNav.menu, icon: Menu },
    { href: "/profile", label: t.mobileNav.profile, icon: User },
  ]

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-full flex-1 flex-col items-center justify-center gap-1",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
