import Link from "next/link"
import { listCoursesAction } from "@/src/features/courses/presentation/states/courses.actions"
import { CourseCard } from "@/src/features/courses/presentation/components/course-card"
import { listBriefsAction } from "@/src/features/briefs/presentation/states/briefs.actions"
import { BriefCard } from "@/src/features/briefs/presentation/components/brief-card"
import { getDiscoverMainAction } from "../states/discover.actions"
import { ExploreBottomBanner } from "../components/explore-bottom-banner"
import { ExploreFaqSection } from "../components/explore-faq-section"
import { ExploreMarketingBanner } from "../components/explore-marketing-banner"
import { ExploreSubjectsByYear } from "../components/explore-subjects-by-year"

function SectionSkeleton() {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-[29.5625rem] w-full max-w-[21.4375rem] animate-pulse rounded-[20px] bg-muted" />
      ))}
    </div>
  )
}

export async function ExploreScreen() {
  const [featuredCourses, discover, briefs] = await Promise.all([
    listCoursesAction(),
    getDiscoverMainAction(),
    listBriefsAction(),
  ])

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex flex-col items-center overflow-x-hidden overflow-y-auto">
        <div className="flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 md:py-8">
          <ExploreMarketingBanner banner={discover.marketingBanner} />

          <div className="mb-8 mt-8">
            <h1 className="text-2xl font-bold">{discover.exploreTitle}</h1>
            <p className="mt-2 text-muted-foreground">{discover.exploreSubtitle}</p>
          </div>

          <ExploreSubjectsByYear subjects={discover.subjects} />

          <div className="mt-10 space-y-12 md:space-y-16 ">
            <section className="flex flex-col gap-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold md:text-[1.375rem]">Cursos</h2>
                <Link href="/courses" className="font-bold text-muted-foreground hover:text-foreground">
                  Ver todos
                </Link>
              </div>
              {featuredCourses.length === 0 ? (
                <SectionSkeleton />
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {featuredCourses.slice(0, 3).map((course, idx) => (
                    <CourseCard key={course.id} course={course} index={idx} />
                  ))}
                </div>
              )}
            </section>

            <section className="flex flex-col gap-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold md:text-[1.375rem]">Briefs</h2>
                <Link href="/briefs" className="font-bold text-muted-foreground hover:text-foreground">
                  Ver todos
                </Link>
              </div>
              {briefs.length === 0 ? (
                <SectionSkeleton />
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {briefs.slice(0, 3).map((brief, idx) => (
                    <BriefCard
                      key={brief.id}
                      brief={brief}
                      index={idx}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="mt-14 md:mt-20">
            <ExploreBottomBanner banner={discover.bottomBanner} />
          </div>

          <ExploreFaqSection faq={discover.faq} />
        </div>
      </div>
    </div>
  )
}
