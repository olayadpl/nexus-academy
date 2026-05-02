import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/core/ui/components/accordion"
import { Button } from "@/src/core/ui/components/button"
import CourseFilters from "../components/course-filters.client"

import { CourseCard } from "../components/course-card"
import { listCoursesAction } from "../states/courses.actions"

export async function CoursesScreen() {
  const courses = await listCoursesAction()
  const faqItems = [
    {
      question: "Como estan estructurados los cursos?",
      answer: "Cada curso incluye modulos progresivos con recursos en video y PDF para avanzar a tu ritmo.",
    },
    {
      question: "Necesito experiencia previa?",
      answer: "Hay cursos para nivel beginner, intermediate y advanced. Puedes comenzar segun tu nivel actual.",
    },
    {
      question: "Puedo continuar despues?",
      answer: "Si. El progreso se guarda y puedes retomar desde la seccion de historial o continuar aprendiendo.",
    },
    {
      question: "Los cursos incluyen evaluaciones?",
      answer: "Algunos cursos incluyen evaluaciones para validar conocimientos y medir avance.",
    },
  ]

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Courses</h1>
          <CourseFilters />
        </div>
        <p className="mt-2 text-muted-foreground">Explora catalogos curados para reforzar tu aprendizaje.</p>
      </header>


      <section className="grid grid-cols-1 justify-items-center gap-6 gap-y-8 mt-6 lg:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, idx) => (
          <CourseCard key={course.id} course={course} index={idx} />
        ))}
      </section>

      <section className="mt-14 rounded-3xl bg-primary px-6 py-8 text-primary-foreground md:mt-20 md:px-12 md:py-10">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">Potencia tu perfil profesional</h2>
        <p className="mt-3 max-w-xl text-primary-foreground/90">Accede a rutas de aprendizaje y evaluaciones para preparar tu siguiente paso.</p>
        <Button className="mt-6" variant="secondary" size="sm">Crear cuenta</Button>
      </section>

      <section className="mt-14 md:mt-20">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold leading-[30px] md:text-[22px] md:leading-8">Preguntas frecuentes</h2>
        <div className="rounded-[20px] bg-muted p-6 shadow-[inset_0_0_0_1px_hsl(var(--border))] md:rounded-3xl md:p-8">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-base font-semibold leading-6 md:text-lg md:leading-7">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base leading-6">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}
