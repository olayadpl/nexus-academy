import { notFound } from "next/navigation"
import { getCareerPathByIdAction } from "@/src/features/career-paths/presentation/states/career-paths.actions"

interface CareerPathDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CareerPathDetailPage({ params }: CareerPathDetailPageProps) {
  const { id } = await params
  const path = await getCareerPathByIdAction(id)

  if (!path) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">{path.title}</h1>
      <p className="mb-4 text-sm text-muted-foreground">{path.description}</p>
      <p className="text-sm text-muted-foreground">Nivel: {path.level} · Horas: {path.estimatedHours}</p>
    </main>
  )
}
