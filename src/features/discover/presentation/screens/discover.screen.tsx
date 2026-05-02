import { getDiscoverSnapshotAction } from "../states/discover.actions"

export async function DiscoverScreen() {
  const snapshot = await getDiscoverSnapshotAction()

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1144px]">
        <section className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Hola {snapshot.greetingName} 👋, bienvenido de vuelta
          </h1>
          <p className="text-muted-foreground">Continua tu recorrido de aprendizaje donde lo dejaste.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-muted p-6">
            <h3 className="mb-2 font-semibold text-foreground">Cursos en progreso</h3>
            <p className="text-2xl font-bold text-foreground">{snapshot.stats.coursesInProgress}</p>
          </div>

          <div className="rounded-2xl border border-border bg-muted p-6">
            <h3 className="mb-2 font-semibold text-foreground">Lecciones completadas</h3>
            <p className="text-2xl font-bold text-foreground">{snapshot.stats.lessonsCompleted}</p>
          </div>

          <div className="rounded-2xl border border-border bg-muted p-6">
            <h3 className="mb-2 font-semibold text-foreground">Racha de dias</h3>
            <p className="text-2xl font-bold text-foreground">{snapshot.stats.dayStreak} 🔥</p>
          </div>
        </section>

      </div>
    </div>
  )
}
