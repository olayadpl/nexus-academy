import { Tabs, TabsList, TabsTrigger } from "@/src/core/ui/components/tabs"
import { ContentCard } from "@/src/core/ui/components/content-card"
import { FilterButton } from "@/src/core/ui/components/filter-button"
import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { getUserPreferencesAction } from "@/src/features/preferences/presentation/states/preferences.actions"
import { searchResourcesAction } from "../states/search.actions"
import type { SearchPageParams } from "../../domain/use-cases/manage-search.use-case"
import { getTranslations, type Locale } from "@/src/lib/i18n/translations"

type SearchScreenProps = {
  searchParams?: SearchPageParams
}

function SearchGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[22.5rem] animate-pulse rounded-[1.25rem] bg-muted" />
      ))}
    </div>
  )
}

export async function SearchScreen({ searchParams }: SearchScreenProps) {
  const sessionUser = await getCurrentSessionAction()
  const userId = sessionUser?.id ?? "demo-user"
  let locale: Locale = "es"

  try {
    const preferences = await getUserPreferencesAction(userId)
    if (preferences?.language) {
      locale = preferences.language
    }
  } catch {
    locale = "es"
  }

  const t = getTranslations(locale)
  const payload = await searchResourcesAction(searchParams)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center overflow-x-hidden overflow-y-auto">
        <main className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {payload.query ? t.search.resultsFor(payload.query) : t.search.searchResources}
            </h1>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground md:text-base">
                {t.search.resultsCount(payload.results.length)}
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-start gap-3">
            <h2 className="text-base font-semibold md:text-lg">{t.search.resultsHeading}</h2>
            <div className="ml-2 md:ml-0">
              <FilterButton type="button">{t.search.filters}</FilterButton>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-full justify-start overflow-x-auto whitespace-nowrap">
              <TabsTrigger value="all">{t.search.tabs.all}</TabsTrigger>
              <TabsTrigger value="resources">{t.search.tabs.resources}</TabsTrigger>
              <TabsTrigger value="courses">{t.search.tabs.courses}</TabsTrigger>
              <TabsTrigger value="lessons">{t.search.tabs.lessons}</TabsTrigger>
              <TabsTrigger value="exercises">{t.search.tabs.exercises}</TabsTrigger>
              <TabsTrigger value="briefs">{t.search.tabs.briefs}</TabsTrigger>
              <TabsTrigger value="assessments">{t.search.tabs.assessments}</TabsTrigger>
              <TabsTrigger value="tutorials">{t.search.tabs.tutorials}</TabsTrigger>
              <TabsTrigger value="projects">{t.search.tabs.projects}</TabsTrigger>
              <TabsTrigger value="community">{t.search.tabs.community}</TabsTrigger>
            </TabsList>
          </Tabs>

          {!payload.query ? (
            <SearchGridSkeleton />
          ) : payload.results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">{t.search.noResultsTitle}</p>
              <p className="mt-2 text-muted-foreground">{t.search.noResultsHint}</p>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
              <div className="mb-4 flex items-center justify-between">
                   <h2 className="text-xl font-semibold">{t.search.resourcesSection}</h2>
                 </div>
                 <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                  {payload.results.map((item) => (
                    <ContentCard
                      key={item.id}
                      item={{
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        type: item.type === "resource" ? "lesson" : item.type,
                        category: item.category,
                        thumbnailUrl: item.thumbnailUrl,
                        durationMinutes: item.durationMinutes,
                      }}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
