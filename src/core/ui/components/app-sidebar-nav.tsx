"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentType } from "react"
import {
  Home,
  Bookmark,
  History,
  Compass,
  BookOpen,
  Route,
  FileText,
  ClipboardCheck,
  GraduationCap,
  Sparkles,
  Trophy,
  Briefcase,
  Menu,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/core/ui/components/sidebar"
import { ScrollArea } from "@/src/core/ui/components/scroll-area"
import { Branding } from "@/src/core/ui/components/branding"

const mainItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/bookmarks", label: "Guardados", icon: Bookmark },
  { href: "/history", label: "Historial", icon: History },
]

const learnItems = [
  { href: "/explore", label: "Explorar", icon: Compass },
  { href: "/courses", label: "Cursos", icon: BookOpen },
  { href: "/career-paths", label: "Rutas Profesionales", icon: Route },
  { href: "/briefs", label: "Proyectos", icon: FileText },
  { href: "/assessments", label: "Evaluaciones", icon: ClipboardCheck },
  { href: "/tutorials", label: "Tutoriales", icon: GraduationCap },
]

const growItems = [
  { href: "/showcase", label: "Portafolio", icon: Sparkles },
  { href: "/certifications", label: "Certificaciones", icon: Trophy },
  { href: "/salary-explorer", label: "Explorador de Salarios", icon: Briefcase },
  { href: "/jobs", label: "Bolsa de Trabajo", icon: Briefcase },
]

function Section({
  title,
  items,
  pathname,
}: {
  title?: string
  items: Array<{ href: string; label: string; icon: ComponentType<{ className?: string }> }>
  pathname: string
}) {
  return (
    <SidebarGroup>
      {title ? <SidebarGroupLabel>{title}</SidebarGroupLabel> : null}
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                <Link href={item.href}>
                  <Icon className="h-9 w-9" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function AppSidebarNav({
  isAuthenticated,
  lockCollapsed = false,
}: {
  isAuthenticated: boolean
  lockCollapsed?: boolean
}) {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <div>
      <Sidebar collapsible="icon" variant="sidebar" className="relative overflow-visible">
        <SidebarHeader className="h-14 pl-2 pr-2 flex-row items-center gap-2">
          {!lockCollapsed ? (
            <button
              onClick={toggleSidebar}
              className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-transparent transition-colors hover:bg-accent"
              aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}
          <SidebarMenu>
            <SidebarMenuItem>
              <Branding href="/explore" className="h-9 w-9 hidden md:block relative top-[2px]" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-2 py-2">
              {isAuthenticated ? <Section items={mainItems} pathname={pathname} /> : null}
              <Section title="APRENDER" items={learnItems} pathname={pathname} />
              <Section title="COMUNIDAD" items={growItems} pathname={pathname} />
            </div>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
