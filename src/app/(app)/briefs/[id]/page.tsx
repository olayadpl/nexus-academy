import { notFound } from "next/navigation"
import { Badge } from "@/src/core/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { getBriefByIdAction } from "@/src/features/briefs/presentation/states/briefs.actions"

interface BriefDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function BriefDetailPage({ params }: BriefDetailPageProps) {
  const { id } = await params
  const brief = await getBriefByIdAction(id)

  if (!brief) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <header className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge>{brief.category}</Badge>
          <Badge variant="secondary">{brief.difficulty}</Badge>
        </div>
        <h1 className="text-2xl font-bold">{brief.title}</h1>
        <p className="mt-2 text-muted-foreground">{brief.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">Autor: {brief.authorName}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Objetivos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {brief.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entregables</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {brief.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
