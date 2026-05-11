import { getLearningHomeAction } from "../states/learning.actions"

export async function HomeScreen() {
  const snapshot = await getLearningHomeAction()

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8">
      <div className="mx-auto w-full max-w-[71.5rem]">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Hola {snapshot.greetingName} 👋, bienvenido de vuelta</h1>
          <p className="text-muted-foreground">Continua tu recorrido de aprendizaje donde lo dejaste.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-muted p-6">
            <h3 className="mb-2 font-semibold">Cursos en progreso</h3>
            <p className="text-2xl font-bold">{snapshot.stats.coursesInProgress}</p>
          </div>

          <div className="rounded-2xl border bg-muted p-6">
            <h3 className="mb-2 font-semibold">Lecciones completadas</h3>
            <p className="text-2xl font-bold">{snapshot.stats.lessonsCompleted}</p>
          </div>

          <div className="rounded-2xl border bg-muted p-6">
            <h3 className="mb-2 font-semibold">Racha de dias</h3>
            <p className="text-2xl font-bold">{snapshot.stats.dayStreak} 🔥</p>
          </div>
        </div>
      </div>
    </div>
  )
}
