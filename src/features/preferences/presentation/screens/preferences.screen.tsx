import { getUserPreferencesAction } from "../states/preferences.actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { Button } from "@/src/core/ui/components/button"
import { Bookmark, Save } from "lucide-react"
import { listUserBookmarksAction } from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { listRecentBookmarksAction } from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { PreferencesClientControls } from "../components/preferences-client-controls"

export async function PreferencesScreen() {
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
          <CardTitle>Preferencias del usuario</CardTitle>
          <CardDescription>Configura tema e idioma para personalizar tu experiencia.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {preferences ? (
            <PreferencesClientControls preferences={preferences} />
          ) : (
            <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              No hay preferencias disponibles para este usuario.
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Usuario actual: {user?.name ?? "No autenticado"} · Tema: {preferences?.theme ?? "-"} · Idioma:{" "}
            {preferences?.language ?? "-"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marcadores ({bookmarks.length})</CardTitle>
          <CardDescription>Recursos guardados por el usuario.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button size="sm" disabled>
            <Bookmark className="mr-2 h-4 w-4" />
            Agregar marcador de prueba
          </Button>
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium">{bookmark.title}</p>
              <p className="text-xs text-muted-foreground">Curso: {bookmark.courseId}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recursos guardados ({savedResources.length})</CardTitle>
          <CardDescription>Resumen rapido de recursos recientes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button size="sm" disabled>
            <Save className="mr-2 h-4 w-4" />
            Guardar recurso de prueba
          </Button>
          {savedResources.map((resource) => (
            <div key={resource.id} className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium">{resource.title}</p>
              <p className="text-xs text-muted-foreground">Curso: {resource.courseId}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
