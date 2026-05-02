"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Bookmark, Home, Menu, User } from "lucide-react"
import { cn } from "@/src/core/ui/lib/utils"

const navItems = [
  { href: "/home", label: "Inicio", icon: Home },
  { href: "/bookmarks", label: "Guardado", icon: Bookmark },
  { href: "/explore", label: "Explorar", icon: Compass },
  { href: "/menu", label: "Menu", icon: Menu },
  { href: "/profile", label: "Perfil", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

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
