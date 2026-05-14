import { notFound } from "next/navigation"
import { ResourceViewerScreen } from "@/src/features/resources/presentation/screens/resource-viewer.screen"
import { getCourseByIdAction } from "@/src/features/courses/presentation/states/courses.actions"
import { listResourcesByCourseAction } from "@/src/features/resources/presentation/states/resources.actions"
import { getUserLocale } from "@/src/lib/i18n/get-locale"

interface ResourcePageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ resource?: string }>
}

export default async function ResourcePage({ params, searchParams }: ResourcePageProps) {
  const { id } = await params
  const query = searchParams ? await searchParams : undefined
  const locale = await getUserLocale()
  const course = await getCourseByIdAction(id, locale)

  if (!course) {
    notFound()
  }

  const resources = await listResourcesByCourseAction(course.id)

  return (
    <ResourceViewerScreen
      course={{
        id: course.id,
        title: course.title,
        description: course.description,
        authorName: course.authorName,
      }}
      resources={resources}
      initialResourceId={query?.resource ?? resources[0]?.id}
      courseModules={course.modules}
    />
  )
}