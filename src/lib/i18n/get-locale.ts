import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { getUserPreferencesAction } from "@/src/features/preferences/presentation/states/preferences.actions"
import type { Locale } from "@/src/lib/i18n/translations"

export async function getUserLocale(): Promise<Locale> {
  const sessionUser = await getCurrentSessionAction()
  const userId = sessionUser?.id ?? "demo-user"

  try {
    const preferences = await getUserPreferencesAction(userId)
    if (preferences?.language) {
      return preferences.language
    }
  } catch {
    return "es"
  }

  return "es"
}
