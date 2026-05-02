import CourseScreen from "@/src/features/courses/presentation/screens/course.screen"

interface Props {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: Props) {
  // Resolve params (may be a promise in some Next configurations)
  const resolved = await params
  return <CourseScreen params={resolved} />
}
