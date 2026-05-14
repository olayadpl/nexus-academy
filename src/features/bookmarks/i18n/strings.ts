import type { Locale } from "@/src/lib/i18n/translations"

export type BookmarksTranslations = ReturnType<typeof getBookmarksTranslations>

export function getBookmarksTranslations(locale: Locale) {
  const en = {
    bookmarks: {
      title: "My saved",
      subtitle: "Organize your saved resources in custom collections",
      emptyTitle: "You have no saved resources",
      emptyDescription: "Save resources from courses and briefs to find them here.",
      exploreResources: "Explore resources",
      courseLabel: "Course",
      openResource: "Open resource",
    },
    collections: {
      title: "My collections",
      subtitle: "Organize your saved resources in custom collections",
      newCollection: "New collection",
      emptyTitle: "You have no collections",
      emptyDescription: "Create collections to organize your saved resources.",
      createFirst: "Create first collection",
      resourceCount: (n: number) => `${n} ${n === 1 ? "resource" : "resources"}`,
    },
    collectionDetail: {
      backToBookmarks: "Back to saved",
      title: (id: string) => `Collection ${id}`,
      resourceCount: (n: number) => `${n} ${n === 1 ? "resource" : "resources"}`,
      emptyTitle: "This collection is empty",
      emptyDescription: "Save resources from courses and briefs to see them here.",
      view: "View",
    },
  }

  const es = {
    bookmarks: {
      title: "Mis guardados",
      subtitle: "Organiza tus recursos guardados en colecciones personalizadas",
      emptyTitle: "No tienes recursos guardados",
      emptyDescription: "Guarda recursos desde cursos y briefs para encontrarlos rapidamente aqui.",
      exploreResources: "Explorar recursos",
      courseLabel: "Curso",
      openResource: "Abrir recurso",
    },
    collections: {
      title: "Mis colecciones",
      subtitle: "Organiza tus recursos guardados en colecciones personalizadas",
      newCollection: "Nueva coleccion",
      emptyTitle: "No tienes colecciones",
      emptyDescription: "Crea colecciones para organizar tus recursos guardados.",
      createFirst: "Crear primera coleccion",
      resourceCount: (n: number) => `${n} ${n === 1 ? "recurso" : "recursos"}`,
    },
    collectionDetail: {
      backToBookmarks: "Volver a guardados",
      title: (id: string) => `Coleccion ${id}`,
      resourceCount: (n: number) => `${n} ${n === 1 ? "recurso" : "recursos"}`,
      emptyTitle: "Esta coleccion esta vacia",
      emptyDescription: "Guarda recursos desde cursos y briefs para verlos aqui.",
      view: "Ver",
    },
  }

  return locale === "es" ? es : en
}
