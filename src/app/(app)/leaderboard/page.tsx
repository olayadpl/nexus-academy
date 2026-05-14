import { getTranslations } from "@/src/lib/i18n/translations"
import { getUserLocale } from "@/src/lib/i18n/get-locale"

export default async function LeaderboardPage() {
  const locale = await getUserLocale()
  const t = getTranslations(locale)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center overflow-x-hidden overflow-y-auto">
        <div className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{t.leaderboard.title}</h1>
            <p className="mt-2 text-muted-foreground">{t.leaderboard.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
