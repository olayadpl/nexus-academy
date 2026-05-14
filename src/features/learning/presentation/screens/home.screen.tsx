import { getLearningHomeAction } from "../states/learning.actions"
import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { getUserPreferencesAction } from "@/src/features/preferences/presentation/states/preferences.actions"
import { getTranslations, type Locale } from "@/src/lib/i18n/translations"

export async function HomeScreen() {
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
  const snapshot = await getLearningHomeAction()

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8">
      <div className="mx-auto w-full max-w-[71.5rem]">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{t.home.greeting(snapshot.greetingName)}</h1>
          <p className="text-muted-foreground">{t.home.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-muted p-6">
            <h3 className="mb-2 font-semibold">{t.home.coursesInProgress}</h3>
            <p className="text-2xl font-bold">{snapshot.stats.coursesInProgress}</p>
          </div>

          <div className="rounded-2xl border bg-muted p-6">
            <h3 className="mb-2 font-semibold">{t.home.lessonsCompleted}</h3>
            <p className="text-2xl font-bold">{snapshot.stats.lessonsCompleted}</p>
          </div>

          <div className="rounded-2xl border bg-muted p-6">
            <h3 className="mb-2 font-semibold">{t.home.dayStreak}</h3>
            <p className="text-2xl font-bold">{snapshot.stats.dayStreak} 🔥</p>
          </div>
        </div>
      </div>
    </div>
  )
}
