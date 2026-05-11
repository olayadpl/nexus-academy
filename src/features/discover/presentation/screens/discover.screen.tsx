import { getDiscoverSnapshotAction } from "../states/discover.actions"

export async function DiscoverScreen() {
  const snapshot = await getDiscoverSnapshotAction()

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8">
      <div className="mx-auto w-full max-w-[71.5rem]">
        <section className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Hola {snapshot.greetingName} 👋, bienvenido de vuelta
          </h1>
          <p className="text-muted-foreground">Continua tu recorrido de aprendizaje donde lo dejaste.</p>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        {snapshot.continueLearning.length > 0 && (
          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Continuar aprendiendo</h2>
              <a href="/history" className="text-sm text-primary hover:underline">
                Ver todo
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {snapshot.continueLearning.slice(0, 3).map((item, idx) => (
                <a
                  key={item.enrollment.id}
                  href={`/courses/${item.course?.id}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <div className="mb-3 h-32 w-full overflow-hidden rounded-xl bg-muted">
                    {item.course?.thumbnailUrl && (
                      <img
                        src={item.course.thumbnailUrl}
                        alt={item.course.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">{item.course?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.enrollment.progressPercent}% completado
                  </p>
                  <div className="mt-auto pt-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${item.enrollment.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {snapshot.featuredCourses.length > 0 && (
          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Cursos destacados</h2>
              <a href="/courses" className="text-sm text-primary hover:underline">
                Ver todo
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {snapshot.featuredCourses.slice(0, 3).map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <div className="mb-3 h-32 w-full overflow-hidden rounded-xl bg-muted">
                    {course.thumbnailUrl && (
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">{course.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
                  <div className="mt-auto pt-3">
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {course.level}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {snapshot.featuredCareerPaths.length > 0 && (
          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Rutas destacadas</h2>
              <a href="/career-paths" className="text-sm text-primary hover:underline">
                Ver todo
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {snapshot.featuredCareerPaths.slice(0, 3).map((careerPath) => (
                <a
                  key={careerPath.id}
                  href={`/career-paths/${careerPath.id}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <div className="mb-3 h-32 w-full overflow-hidden rounded-xl bg-muted">
                    {careerPath.imageUrl && (
                      <img
                        src={careerPath.imageUrl}
                        alt={careerPath.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">{careerPath.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{careerPath.description}</p>
                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <span className="text-sm text-muted-foreground">
                      {careerPath.coursesCount} cursos
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {careerPath.estimatedHours}h est.
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {snapshot.recentAssessments.length > 0 && (
          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Evaluaciones recientes</h2>
              <a href="/assessments" className="text-sm text-primary hover:underline">
                Ver todo
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {snapshot.recentAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{assessment.courseTitle}</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        assessment.status === "passed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {assessment.status === "passed" ? "Aprobado" : "Pendiente"}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {assessment.score}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(assessment.completedAt ?? assessment.startedAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {snapshot.recentBookmarks.length > 0 && (
          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Guardados recientes</h2>
              <a href="/bookmarks" className="text-sm text-primary hover:underline">
                Ver todo
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {snapshot.recentBookmarks.slice(0, 3).map((bookmark) => (
                <a
                  key={bookmark.id}
                  href={bookmark.href}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">{bookmark.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{bookmark.description}</p>
                  <p className="mt-auto pt-3 text-sm text-muted-foreground">
                    Guardado el {new Date(bookmark.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}