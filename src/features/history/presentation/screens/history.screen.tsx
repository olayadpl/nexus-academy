import Link from "next/link"
import {
  clearNavigationHistoryAction,
  clearSearchHistoryAction,
  listNavigationHistoryAction,
  listSearchHistoryAction,
} from "../states/history.actions"
import { Button } from "@/src/core/ui/components/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/core/ui/components/tabs"
import { Clock, History as HistoryIcon, Search as SearchIcon, Trash2 } from "lucide-react"
import { getTranslations } from "@/src/lib/i18n/translations"
import { getUserLocale } from "@/src/lib/i18n/get-locale"

export async function HistoryScreen() {
  const locale = await getUserLocale()
  const t = getTranslations(locale)
  const [navigationItems, searchItems] = await Promise.all([
    listNavigationHistoryAction(),
    listSearchHistoryAction(),
  ])
  const dateLocale = locale === "es" ? "es-ES" : "en-US"

  return (
    <main className="max-w-[71.5rem] px-4 py-14 md:px-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{t.history.title}</h1>
        <p className="text-muted-foreground">{t.history.subtitle}</p>
      </header>

      <Tabs defaultValue="navigation" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="navigation">
            <Clock className="mr-2 h-4 w-4" />
            {t.history.tabs.navigation}
          </TabsTrigger>
          <TabsTrigger value="search">
            <SearchIcon className="mr-2 h-4 w-4" />
            {t.history.tabs.search}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t.history.navigationTitle(navigationItems.length)}</h2>
            {navigationItems.length > 0 ? (
              <form action={clearNavigationHistoryAction}>
                <Button variant="outline" size="sm" type="submit">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t.history.clear}
                </Button>
              </form>
            ) : null}
          </div>

          {navigationItems.length === 0 ? (
            <div className="flex min-h-[18.75rem] w-full items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
              <div className="text-center">
                <HistoryIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">{t.history.emptyNavigationTitle}</h3>
                <p className="text-sm text-muted-foreground">{t.history.emptyNavigationHint}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="block rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">
                          {item.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.visitedAt).toLocaleString(dateLocale)}
                        </span>
                      </div>
                      <p className="truncate font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.url}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="search" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t.history.searchTitle(searchItems.length)}</h2>
            {searchItems.length > 0 ? (
              <form action={clearSearchHistoryAction}>
                <Button variant="outline" size="sm" type="submit">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t.history.clear}
                </Button>
              </form>
            ) : null}
          </div>

          {searchItems.length === 0 ? (
            <div className="flex min-h-[18.75rem] w-full items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
              <div className="text-center">
                <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">{t.history.emptySearchTitle}</h3>
                <p className="text-sm text-muted-foreground">{t.history.emptySearchHint}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {searchItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/search?q=${encodeURIComponent(item.query)}`}
                  className="block rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <SearchIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{item.query}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.searchedAt).toLocaleString(dateLocale)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}
