import { MigrationPlaceholderScreen } from "@/src/features/discover/presentation/components/migration-placeholder.screen"
import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { getUserPreferencesAction } from "@/src/features/preferences/presentation/states/preferences.actions"
import { getTranslations, type Locale } from "@/src/lib/i18n/translations"

export default function TermsPage() {
  return <TermsContent />
}

async function TermsContent() {
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

  return (
    <MigrationPlaceholderScreen
      title={t.terms.title}
      description={t.terms.description}
    />
  )
}
