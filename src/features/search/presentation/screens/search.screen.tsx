import { Tabs, TabsList, TabsTrigger } from "@/src/core/ui/components/tabs"
import { ContentCard } from "@/src/core/ui/components/content-card"
import { FilterButton } from "@/src/core/ui/components/filter-button"
import { searchResourcesAction } from "../states/search.actions"
import type { SearchPageParams } from "../../domain/use-cases/manage-search.use-case"

type SearchScreenProps = {
  searchParams?: SearchPageParams
}

function SearchGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[360px] animate-pulse rounded-[20px] bg-muted" />
      ))}
    </div>
  )
}

export async function SearchScreen({ searchParams }: SearchScreenProps) {
  const payload = await searchResourcesAction(searchParams)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center overflow-x-hidden overflow-y-auto">
        <main className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{payload.query ? `Resultados para "${payload.query}"` : "Buscar recursos"}</h1>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground md:text-base">{payload.results.length} resultados</p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-start gap-3">
            <h2 className="text-base font-semibold md:text-lg">Resultados de la busqueda</h2>
            <div className="ml-2 md:ml-0">
              <FilterButton type="button">Filtros</FilterButton>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-full justify-start overflow-x-auto whitespace-nowrap">
              <TabsTrigger value="all">Todo</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="lessons">Lecciones</TabsTrigger>
              <TabsTrigger value="exercises">Ejercicios</TabsTrigger>
              <TabsTrigger value="briefs">Briefs</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="projects">Proyectos</TabsTrigger>
              <TabsTrigger value="community">Comunidad</TabsTrigger>
            </TabsList>
          </Tabs>

          {!payload.query ? (
            <SearchGridSkeleton />
          ) : payload.results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No se encontraron resultados.</p>
              <p className="mt-2 text-muted-foreground">Prueba con un termino diferente.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
              <div className="mb-4 flex items-center justify-between">
                   <h2 className="text-xl font-semibold">Recursos</h2>
                 </div>
                 <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                  {payload.results.map((item) => (
                    <ContentCard
                      key={item.id}
                      item={{
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        type: item.type === "resource" ? "lesson" : item.type,
                        category: item.category,
                        thumbnailUrl: item.thumbnailUrl,
                        durationMinutes: item.durationMinutes,
                      }}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
