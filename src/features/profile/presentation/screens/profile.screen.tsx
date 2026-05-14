import { getCurrentProfileAction } from "../states/profile.actions"
import { getTranslations } from "@/src/lib/i18n/translations"
import { getUserLocale } from "@/src/lib/i18n/get-locale"

export async function ProfileScreen() {
  const locale = await getUserLocale()
  const t = getTranslations(locale)
  const profile = await getCurrentProfileAction()

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center overflow-x-hidden overflow-y-auto">
        <main className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">{t.profile.title}</h1>
            <p className="mt-2 text-muted-foreground">{t.profile.subtitle}</p>
          </header>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{t.profile.userLabel}: {profile.user?.name ?? t.profile.notAuthenticated}</p>
            <p>{t.profile.emailLabel}: {profile.user?.email ?? "-"}</p>
            <p>{t.profile.providerLabel}: {profile.user?.provider ?? "-"}</p>
            <p>{t.profile.themeLabel}: {profile.preferences?.theme ?? "-"}</p>
          </div>
        </main>
      </div>
    </div>
  )
}
