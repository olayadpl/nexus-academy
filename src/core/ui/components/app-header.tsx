"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@/src/core/ui/hooks/use-theme"
import {
  ArrowLeft,
  Search,
  Share2,
  Grip,
  User,
  Settings,
  LogOut,
  Languages,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { AppSearchOverlay } from "@/src/core/ui/components/app-search-overlay"
import { Branding } from "@/src/core/ui/components/branding"
import BreadcrumbPortal from "@/src/core/ui/components/breadcrumb-portal.client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/core/ui/components/dropdown-menu"
import { logoutAction } from "@/src/features/auth/presentation/states/auth.actions"
import {
  getUserPreferencesAction,
  saveUserPreferencesAction,
} from "@/src/features/preferences/presentation/states/preferences.actions"

type AppHeaderUser = {
  id: string
  name: string
  email: string
  avatarUrl?: string
} | null

const languageFlags = {
  es: "🇪🇸",
  en: "🇺🇸",
} as const

const languageNames = {
  es: "Espanol",
  en: "English",
} as const

export function AppHeader({ sessionUser }: { sessionUser: AppHeaderUser }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [headerSearchQuery, setHeaderSearchQuery] = useState("")
  const [language, setLanguage] = useState<"es" | "en">("es")
  const isAuthenticated = Boolean(sessionUser)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const isResourcePage = pathname?.startsWith("/resource/") ?? false
  const userId = sessionUser?.id ?? "demo-user"

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    void getUserPreferencesAction(userId).then((preferences) => {
      if (preferences) {
        setLanguage(preferences.language)
      }
    })
  }, [userId])

  const searchPlaceholder = language === "es" ? "Buscar recursos..." : "Search resources..."

  const themeLabel =
    theme === "light" ? "Claro" : theme === "dark" ? "Oscuro" : "Sistema"

  const themeIcon =
    theme === "system" || !theme ? (
      <Monitor className="h-4 w-4" />
    ) : theme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Moon className="h-4 w-4" />
    )

  const persistPreferences = async (patch: { language?: "es" | "en"; theme?: "light" | "dark" | "system" }) => {
    const current = await getUserPreferencesAction(userId)

    if (!current) {
      return
    }

    await saveUserPreferencesAction({
      ...current,
      ...patch,
      userId,
    })
  }

  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"]
    const currentIndex = themes.indexOf((theme as "light" | "dark" | "system") ?? "system")
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setTheme(nextTheme)
    void persistPreferences({ theme: nextTheme })
  }

  const toggleLanguage = () => {
    const nextLanguage = language === "es" ? "en" : "es"
    setLanguage(nextLanguage)
    void persistPreferences({ language: nextLanguage })
  }

  const submitHeaderSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = headerSearchQuery.trim()

    if (!normalized) {
      return
    }

    router.push(`/search?q=${encodeURIComponent(normalized)}`)
  }

  const handleShareCurrentPage = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url })
        return
      }
      await navigator.clipboard.writeText(url)
    } catch {
      // no-op: user may cancel native share dialog
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center bg-background pt-1">
        <div className="flex w-full items-center">
          <div className="flex flex-1 items-center justify-between pl-4 pr-4 sm:pr-6 lg:pr-8">
            <div className="flex items-center gap-3">
              <Branding href="/explore" className="relative top-[2px] h-9 w-9 md:hidden" />
              {isResourcePage && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:inline-flex"
                  onClick={() => router.back()}
                  aria-label="Volver"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              {isResourcePage && (
                <BreadcrumbPortal className="ml-1 hidden md:block" />
              )}
            </div>
            {!isResourcePage ? (
              <form
                onSubmit={submitHeaderSearch}
                className="ml-6 hidden h-9 w-full max-w-md items-center gap-2 rounded-full border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
              >
                <Search className="h-4 w-4 shrink-0" />
                <input
                  type="search"
                  value={headerSearchQuery}
                  onChange={(event) => setHeaderSearchQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                  aria-label="Buscar"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex h-5 items-center rounded-full border bg-background px-2 font-mono text-[10px] font-medium"
                  aria-label="Abrir busqueda rapida"
                >
                  <span className="text-xs">⌘</span>K
                </button>
              </form>
            ) : (
              <div />
            )}

            <div className="ml-auto flex items-center gap-1">
              {!isResourcePage && (
                <form
                  onSubmit={submitHeaderSearch}
                  className="flex h-9 w-full max-w-[220px] items-center gap-2 rounded-full border bg-muted/50 px-3 text-sm text-muted-foreground md:hidden"
                >
                  <Search className="h-4 w-4 shrink-0" />
                  <input
                    type="search"
                    value={headerSearchQuery}
                    onChange={(event) => setHeaderSearchQuery(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                    aria-label="Buscar"
                  />
                </form>
              )}

              {isResourcePage ? (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={cycleTheme}
                    aria-label="Cambiar tema"
                    className="hidden md:inline-flex"
                  >
                    {themeIcon}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      void handleShareCurrentPage()
                    }}
                    aria-label="Compartir recurso"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Buscar">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              ) : !isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="flex h-9 items-center justify-center rounded-full px-3 text-sm font-semibold hover:bg-muted"
                  >
                    {language === "es" ? "Iniciar sesion" : "Login"}
                  </Link>
                  <Link
                    href="/signup"
                    className="flex h-9 items-center justify-center rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                  >
                    {language === "es" ? "Registrarse" : "Sign up"}
                  </Link>
                </>
              ) : (
                <>
                  {!isResourcePage && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Apps">
                          <Grip className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>{language === "es" ? "Aplicaciones" : "Apps"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/bookmarks" className="cursor-pointer">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path
                                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {language === "es" ? "Biblioteca" : "Library"}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/collections" className="cursor-pointer">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            {language === "es" ? "Repositorio" : "Repository"}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/courses" className="cursor-pointer">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path
                                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                                strokeWidth="2"
                              />
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeWidth="2" />
                              <line x1="12" y1="22.08" x2="12" y2="12" strokeWidth="2" />
                            </svg>
                            {language === "es" ? "Cursos" : "Courses"}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/briefs" className="cursor-pointer">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path
                                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {language === "es" ? "Investigacion" : "Research"}
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full" aria-label="Cuenta">
                        {sessionUser?.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={sessionUser.avatarUrl}
                            alt={sessionUser.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-medium leading-none">{sessionUser?.name}</span>
                          <span className="text-xs leading-none text-muted-foreground">{sessionUser?.email}</span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="h-4 w-4" />
                          {language === "es" ? "Perfil" : "Profile"}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer">
                          <Settings className="h-4 w-4" />
                          {language === "es" ? "Ajustes" : "Settings"}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                        {language === "es" ? "Accesibilidad" : "Accessibility"}
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={(event) => {
                          event.preventDefault()
                          cycleTheme()
                        }}
                        onSelect={(event) => event.preventDefault()}
                        className="cursor-pointer"
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            {themeIcon}
                            <span className="ml-2">
                              {language === "es" ? "Tema" : "Theme"}: {themeLabel}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) => {
                          event.preventDefault()
                          toggleLanguage()
                        }}
                        onSelect={(event) => event.preventDefault()}
                        className="cursor-pointer"
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <Languages className="h-4 w-4" />
                            <span className="ml-2">
                              {language === "es" ? "Idioma" : "Language"}: {languageNames[language]}
                            </span>
                          </div>
                          <span className="text-base">{languageFlags[language]}</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => {
                          void logoutAction().then(() => {
                            router.push("/login")
                            router.refresh()
                          })
                        }}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        {language === "es" ? "Cerrar sesion" : "Log out"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AppSearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
