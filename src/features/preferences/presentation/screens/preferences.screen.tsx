import { getUserPreferencesAction } from "../states/preferences.actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { Button } from "@/src/core/ui/components/button"
import { Bookmark, Save } from "lucide-react"
import { listUserBookmarksAction } from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { listRecentBookmarksAction } from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { PreferencesClientControls } from "../components/preferences-client-controls"
import { getTranslations } from "@/src/lib/i18n/translations"
import { getUserLocale } from "@/src/lib/i18n/get-locale"

export async function PreferencesScreen() {
  const locale = await getUserLocale()
  const t = getTranslations(locale)
  const [preferences, user, bookmarks, savedResources] = await Promise.all([
    getUserPreferencesAction(),
    getCurrentSessionAction(),
    listUserBookmarksAction(),
    listRecentBookmarksAction(),
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.preferencesScreen.title}</CardTitle>
          <CardDescription>{t.preferencesScreen.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {preferences ? (
            <PreferencesClientControls preferences={preferences} />
          ) : (
            <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              {t.preferencesScreen.noPreferences}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {t.preferencesScreen.currentUserLabel}: {user?.name ?? t.preferencesScreen.notAuthenticated} ·
            {" "}{t.preferencesScreen.themeLabel}: {preferences?.theme ?? "-"} · {t.preferencesScreen.languageLabel}:{" "}
            {preferences?.language ?? "-"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.preferencesScreen.bookmarksTitle(bookmarks.length)}</CardTitle>
          <CardDescription>{t.preferencesScreen.bookmarksDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button size="sm" disabled>
            <Bookmark className="mr-2 h-4 w-4" />
            {t.preferencesScreen.addBookmark}
          </Button>
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium">{bookmark.title}</p>
              <p className="text-xs text-muted-foreground">
                {t.preferencesScreen.courseLabel}: {bookmark.courseId}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.preferencesScreen.savedResourcesTitle(savedResources.length)}</CardTitle>
          <CardDescription>{t.preferencesScreen.savedResourcesDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button size="sm" disabled>
            <Save className="mr-2 h-4 w-4" />
            {t.preferencesScreen.addSavedResource}
          </Button>
          {savedResources.map((resource) => (
            <div key={resource.id} className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium">{resource.title}</p>
              <p className="text-xs text-muted-foreground">
                {t.preferencesScreen.courseLabel}: {resource.courseId}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
