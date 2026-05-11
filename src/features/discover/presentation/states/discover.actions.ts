"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { DiscoverMockDataSource } from "../../data/datasources/mock/discover-mock.ds"
import { DiscoverRepositoryImpl } from "../../data/repositories/discover.repository-impl"
import type { DiscoverEntity } from "../../domain/entities/discover.entity"
import { ManageDiscoverUseCase } from "../../domain/use-cases/manage-discover.use-case"
import type { CareerPathEntity } from "@/src/features/career-paths/domain/entities/career-path.entity"
import type { AssessmentEntity } from "@/src/features/assessments/domain/entities/assessment.entity"
import type { BookmarkEntity } from "@/src/features/bookmarks/domain/entities/bookmark.entity"
import type { CourseEntity } from "@/src/features/courses/domain/entities/course.entity"
import { listUserAssessmentsAction } from "@/src/features/assessments/presentation/states/assessments.actions"
import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { listFeaturedCareerPathsAction } from "@/src/features/career-paths/presentation/states/career-paths.actions"
import {
  type ContinueLearningItem,
  listContinueLearningAction,
} from "@/src/features/enrollments/presentation/states/enrollments.actions"
import { listRecentBookmarksAction } from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { listFeaturedCoursesAction } from "@/src/features/courses/presentation/states/courses.actions"

function createUseCases() {
  const dataSource = new DiscoverMockDataSource()
  const repository = new DiscoverRepositoryImpl(dataSource)

  return {
    manageDiscoverUseCase: new ManageDiscoverUseCase(repository),
  }
}

function mapError(error: unknown): never {
  if (error instanceof Failure) {
    if (error.code === "NOT_FOUND") {
      throw new AppError(404, error.code, error.message)
    }
    throw new AppError(400, error.code, error.message)
  }

  if (error instanceof AppError) {
    throw error
  }

  throw new AppError(500, "UNEXPECTED", "Unexpected error")
}

export interface DiscoverSnapshot {
  greetingName: string
  stats: {
    coursesInProgress: number
    lessonsCompleted: number
    dayStreak: number
  }
  featuredCourses: CourseEntity[]
  featuredCareerPaths: CareerPathEntity[]
  continueLearning: ContinueLearningItem[]
  recentBookmarks: BookmarkEntity[]
  recentAssessments: AssessmentEntity[]
}

export async function getDiscoverMainAction(): Promise<DiscoverEntity> {
  try {
    const { manageDiscoverUseCase } = createUseCases()
    return await manageDiscoverUseCase.getMain()
  } catch (error) {
    console.error("getDiscoverMainAction error:", error)
    return {
      id: "fallback",
      marketingBanner: { id: "fallback-banner", title: "Bienvenido", description: "", imageUrl: "", ctaText: "Explorar", ctaHref: "/explore" },
      exploreTitle: "Explorar",
      exploreSubtitle: "Encuentra tu siguiente tema",
      subjects: [],
      featuredCourses: [],
      featuredCareerPaths: [],
      bottomBanner: { id: "fallback-bottom", title: "Sigue aprendiendo", ctaText: "Ver mas", ctaHref: "/courses" },
      faq: [],
    }
  }
}

export async function getDiscoverSnapshotAction(): Promise<DiscoverSnapshot> {
  try {
    const [sessionUser, featuredCourses, featuredCareerPaths, continueLearning, recentBookmarks, recentAssessments] = await Promise.all([
      getCurrentSessionAction().catch(() => null),
      listFeaturedCoursesAction(),
      listFeaturedCareerPathsAction().catch(() => []),
      listContinueLearningAction().catch(() => []),
      listRecentBookmarksAction().catch(() => []),
      listUserAssessmentsAction().catch(() => []),
    ])

    const lessonsCompleted = continueLearning.reduce((acc, item) => {
      const completed = (item.course?.modules ?? []).reduce(
        (sectionAcc, section) => sectionAcc + (section.resources ?? []).filter((mod) => mod.completed).length,
        0
      )
      return acc + completed
    }, 0)

    return {
      greetingName: sessionUser?.name?.split(/\s+/)[0] ?? "Usuario",
      stats: {
        coursesInProgress: continueLearning.length,
        lessonsCompleted,
        dayStreak: 12,
      },
      featuredCourses: featuredCourses ?? [],
      featuredCareerPaths: featuredCareerPaths ?? [],
      continueLearning: continueLearning ?? [],
      recentBookmarks: recentBookmarks ?? [],
      recentAssessments: (recentAssessments ?? []).slice(0, 3),
    }
  } catch (error) {
    console.error("getDiscoverSnapshotAction error:", error)
    return {
      greetingName: "Usuario",
      stats: { coursesInProgress: 0, lessonsCompleted: 0, dayStreak: 0 },
      featuredCourses: [],
      featuredCareerPaths: [],
      continueLearning: [],
      recentBookmarks: [],
      recentAssessments: [],
    }
  }
}
