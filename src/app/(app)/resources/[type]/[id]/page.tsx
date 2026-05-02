import { notFound, redirect } from "next/navigation"
import { getResourceByIdAction } from "@/src/features/resources/presentation/states/resources.actions"

interface LegacyResourcePageProps {
  params: Promise<{ type: string; id: string }>
}

export default async function LegacyResourcePage({ params }: LegacyResourcePageProps) {
  const { id } = await params
  const resource = await getResourceByIdAction(id)

  if (!resource) {
    notFound()
  }

  redirect(`/resource/${resource.courseId}?resource=${resource.id}`)
}
