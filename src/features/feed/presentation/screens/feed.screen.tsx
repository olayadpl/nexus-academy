import { listLatestFeedAction } from "../states/feed.actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/core/ui/components/card"

const categoryLabel = {
  course: "Curso",
  brief: "Brief",
  assessment: "Evaluacion",
} as const

export async function FeedScreen() {
  const items = await listLatestFeedAction()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <section className="mb-8">
        <h1 className="text-2xl font-bold">Feed</h1>
        <p className="mt-2 text-muted-foreground">Descubre lo que esta haciendo la comunidad</p>
      </section>

      <section className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                {categoryLabel[item.category]} · {new Date(item.createdAt).toLocaleDateString("es-ES")}
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
