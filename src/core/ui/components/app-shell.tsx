"use client"

import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import type { CSSProperties, ReactNode } from "react"
import { SidebarProvider } from "@/src/core/ui/components/sidebar"
import { AppHeader } from "@/src/core/ui/components/app-header"
import { AppSidebarNav } from "@/src/core/ui/components/app-sidebar-nav"
import { AppFooter } from "@/src/core/ui/components/app-footer"
import { MobileNav } from "@/src/core/ui/components/mobile-nav"
import { PreferencesSync } from "@/src/core/ui/components/preferences-sync"
import { NavigationTracker } from "@/src/core/ui/components/navigation-tracker"

type AppShellUser = {
  id: string
  name: string
  email: string
} | null

const AUTH_ROUTES = new Set(["/login", "/signup"])

export function AppShell({
  children,
  sessionUser,
}: {
  children: ReactNode
  sessionUser: AppShellUser
}) {
  const pathname = usePathname()
  const isResourceRoute = useMemo(() => pathname.startsWith("/resource/"), [pathname])
  const hideFooterAndMobileNav = isResourceRoute
  const lockSidebarCollapsed = useMemo(
    () => pathname.startsWith("/resources/video/"),
    [pathname]
  )
  const hideSidebar = isResourceRoute
  const [manualSidebarOpen, setManualSidebarOpen] = useState(true)
  const sidebarOpen = hideSidebar ? false : lockSidebarCollapsed ? false : manualSidebarOpen

  if (AUTH_ROUTES.has(pathname)) {
    return <>{children}</>
  }

  return (
    <SidebarProvider
      open={sidebarOpen}
      onOpenChange={(nextOpen) => {
        if (!lockSidebarCollapsed) {
          setManualSidebarOpen(nextOpen)
        }
      }}
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-icon": "3.5rem",
        } as CSSProperties
      }
    >
      <div className="flex min-h-screen w-full flex-col">
        <PreferencesSync />
        <NavigationTracker />
        <div className="flex flex-1">
          {!hideSidebar && (
            <div className="sticky top-0 h-screen">
              <AppSidebarNav isAuthenticated={Boolean(sessionUser)} lockCollapsed={lockSidebarCollapsed} />
            </div>
          )}
          <div className="flex flex-1 flex-col">
            <AppHeader sessionUser={sessionUser} />
            <main className="flex-1">{children}</main>
            {!hideFooterAndMobileNav && <AppFooter />}
          </div>
        </div>
        {!hideFooterAndMobileNav && <MobileNav />}
      </div>
    </SidebarProvider>
  )
}
