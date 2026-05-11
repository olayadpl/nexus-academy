import { listCareerPathsAction } from "../states/career-paths.actions"
import { CareerPathCard } from "../components/career-path-card"

export async function CareerPathsScreen() {
  const paths = await listCareerPathsAction()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Rutas Profesionales</h1>
        <p className="mt-2 text-muted-foreground">
          Descubre itinerarios para avanzar por perfiles profesionales.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paths.map((path, idx) => (
          <CareerPathCard key={path.id} path={path} index={idx} />
        ))}
      </section>
    </main>
  )
}