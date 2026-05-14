import { listLatestFeedAction } from "../states/feed.actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { getTranslations } from "@/src/lib/i18n/translations"
import { getUserLocale } from "@/src/lib/i18n/get-locale"

export async function FeedScreen() {
  const locale = await getUserLocale()
  const t = getTranslations(locale)
  const items = await listLatestFeedAction()
  const dateLocale = locale === "es" ? "es-ES" : "en-US"

  const categoryLabel = {
    course: t.feed.category.course,
    brief: t.feed.category.brief,
    assessment: t.feed.category.assessment,
  } as const

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <section className="mb-8">
        <h1 className="text-2xl font-bold">{t.feed.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.feed.subtitle}</p>
      </section>

      <section className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                {categoryLabel[item.category]} · {new Date(item.createdAt).toLocaleDateString(dateLocale)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
