import type { CourseEntity } from "../../domain/entities/course.entity"

interface CourseResourceScreenProps {
  course: CourseEntity
}

export function CourseResourceScreen({ course }: CourseResourceScreenProps) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Course Resource</p>
        <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </header>

      <section className="mb-6 rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Autor: {course.authorName ?? "No definido"}</p>
        <p className="text-sm text-muted-foreground">
          Nivel: {course.level} · Duracion: {course.durationHours}h · Rating: {course.rating}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Modulos</h2>
        <ul className="space-y-2">
          {course.modules.map((module) => (
            <li key={module.id} className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm font-medium text-foreground">{module.title}</p>
              <p className="text-xs text-muted-foreground">
                {module.type.toUpperCase()} · {module.durationMinutes} min · {module.completed ? "Completado" : "Pendiente"}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
