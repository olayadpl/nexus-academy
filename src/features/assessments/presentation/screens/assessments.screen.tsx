import { listUserAssessmentsAction } from "../states/assessments.actions"
import { AssessmentCard } from "../components/assessment-card"

export async function AssessmentsScreen() {
  const assessments = await listUserAssessmentsAction()

  return (
    <main className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Evaluaciones</h1>
        <p className="mt-2 text-muted-foreground">Valida tu progreso con pruebas y revisa resultados recientes.</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
          <AssessmentCard key={assessment.id} assessment={assessment} />
        ))}
      </section>
    </main>
  )
}
