"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useLocale } from "@/src/core/ui/hooks/use-locale"
import { getTranslations } from "@/src/lib/i18n/translations"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/core/ui/components/command"
import { SEARCH_FIXTURES } from "@/src/features/search/data/datasources/mock/search-mock.ds"

type AppSearchOverlayProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SEARCHABLE_ITEMS = SEARCH_FIXTURES.map((item) => ({
  id: item.id,
  href: `/search?q=${encodeURIComponent(item.title)}`,
  label: item.title,
  hint: item.description,
  value: `${item.title} ${item.description} ${item.category}`,
}))

export function AppSearchOverlay({ open, onOpenChange }: AppSearchOverlayProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const { locale } = useLocale()
  const t = getTranslations(locale)

  const navItems = [
    { href: "/explore", label: t.nav.explore, hint: t.searchOverlay.navHints.explore },
    { href: "/courses", label: t.nav.courses, hint: t.searchOverlay.navHints.courses },
    { href: "/career-paths", label: t.nav.careerPaths, hint: t.searchOverlay.navHints.careerPaths },
    { href: "/briefs", label: t.nav.briefs, hint: t.searchOverlay.navHints.briefs },
    { href: "/assessments", label: t.nav.assessments, hint: t.searchOverlay.navHints.assessments },
    { href: "/bookmarks", label: t.nav.bookmarks, hint: t.searchOverlay.navHints.bookmarks },
    { href: "/history", label: t.nav.history, hint: t.searchOverlay.navHints.history },
    { href: "/settings", label: t.header.settings, hint: t.searchOverlay.navHints.settings },
    { href: "/collections", label: t.header.repository, hint: t.searchOverlay.navHints.collections },
  ]

  const normalizedQuery = query.trim().toLowerCase()

  const filteredResults = useMemo(() => {
    if (!normalizedQuery) {
      return SEARCHABLE_ITEMS.slice(0, 6)
    }

    return SEARCHABLE_ITEMS.filter((item) => item.value.toLowerCase().includes(normalizedQuery)).slice(0, 8)
  }, [normalizedQuery])

  const goTo = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  const submitSearch = (value: string) => {
    const normalized = value.trim()

    if (!normalized) {
      return
    }

    onOpenChange(false)
    router.push(`/search?q=${encodeURIComponent(normalized)}`)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t.searchOverlay.title}
      description={t.searchOverlay.description}
      className="max-w-2xl"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            submitSearch(query)
          }
        }}
        placeholder={t.searchOverlay.placeholder}
      />
      <CommandList>
        <CommandEmpty>{t.searchOverlay.empty}</CommandEmpty>
        <CommandGroup heading={t.searchOverlay.results}>
          {filteredResults.map((item) => (
            <CommandItem key={item.id} value={item.value} onSelect={() => goTo(item.href)}>
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.hint}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t.searchOverlay.navigation}>
          {navItems.map((item) => (
            <CommandItem
              key={item.href}
              value={`${item.label} ${item.hint} ${item.href}`}
              onSelect={() => goTo(item.href)}
            >
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.hint}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t.searchOverlay.account}>
          <CommandItem value="login" onSelect={() => goTo("/login")}>{t.searchOverlay.login}</CommandItem>
          <CommandItem value="signup" onSelect={() => goTo("/signup")}>{t.searchOverlay.signup}</CommandItem>
          <CommandItem value="profile" onSelect={() => goTo("/profile")}>{t.searchOverlay.profile}</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
