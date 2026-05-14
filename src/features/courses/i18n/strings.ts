import type { Locale } from "@/src/lib/i18n/translations"

export type CoursesTranslations = ReturnType<typeof getCoursesTranslations>

export function getCoursesTranslations(locale: Locale) {
  const en = {
    course: {
      courses: "Courses",
      startCourse: "Start course",
      preview: "Preview",
      whatYouWillLearn: "What you'll learn",
      courseContent: "Course content",
      requirements: "Requirements",
      includes: "This course includes",
      includedResources: (n: number) => `${n} resources`,
      accessLifetime: "Lifetime access",
      certificate: "Certificate of completion",
      noPrereq: "No prior experience required",
      accessInternet: "Computer with internet access",
      toolAccount: "Free account if the tool applies",
      duration: "Duration",
      level: "Level",
      students: "Students",
      rating: "Rating",
      instructor: "Instructor",
      instructorBio: "Subject-matter expert with years of teaching experience",
      instructorLanguages: "Spanish · English",
      moduleLabel: (n: number) => `Module ${n}`,
      modulesCount: (n: number) => `${n} modules`,
      resourcesLabel: "Resources",
      totalDurationLabel: "Total duration",
      contentDuration: (hours: number) => `${hours}h of content`,
      completionLabel: "On completion",
      lifetimeAccessLabel: "Lifetime access",
      certificateSectionTitle: "Certificate",
      certificateAlt: "Certificate",
      certificateDescription:
        "Upon completing this course, you will receive a digital certificate you can add to your professional profile and share on LinkedIn.",
      levelNames: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
      requirementsList: [
        "No prior experience required",
        "Computer with internet access",
        "Eager to learn and practice",
      ],
    },
    courseCard: {
      label: "Course",
      authorAlt: "Instructor",
      level: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
    },
    courseFilters: {
      filters: "Filters",
      sortBy: "Sort",
      mostPopular: "Most popular",
      mostViewed: "Most viewed",
      categories: "Categories",
      design: "Design",
      programming: "Programming",
      databases: "Databases",
      devops: "DevOps",
    },
    coursesScreen: {
      title: "Courses",
      subtitle: "Explore curated catalogs to strengthen your learning.",
      promoTitle: "Boost your professional profile",
      promoSubtitle: "Access learning paths and assessments to prepare your next step.",
      promoCta: "Create account",
      faqTitle: "Frequently asked questions",
      faqItems: [
        {
          question: "How are courses structured?",
          answer: "Each course includes progressive modules with video and PDF resources so you can learn at your pace.",
        },
        {
          question: "Do I need prior experience?",
          answer: "There are courses for beginner, intermediate, and advanced levels. You can start based on your current level.",
        },
        {
          question: "Can I continue later?",
          answer: "Yes. Your progress is saved and you can resume from the history section or keep learning.",
        },
        {
          question: "Do courses include assessments?",
          answer: "Some courses include assessments to validate knowledge and track progress.",
        },
      ],
    },
    courseDescription: {
      showMore: "Show more",
      showLess: "Show less",
    },
  }

  const es = {
    course: {
      courses: "Cursos",
      startCourse: "Comenzar curso",
      preview: "Vista previa",
      whatYouWillLearn: "Lo que aprenderas",
      courseContent: "Contenido del curso",
      requirements: "Requisitos",
      includes: "Este curso incluye",
      includedResources: (n: number) => `${n} recursos`,
      accessLifetime: "Acceso de por vida",
      certificate: "Certificado de finalizacion",
      noPrereq: "No se requiere experiencia previa",
      accessInternet: "Computadora con acceso a internet",
      toolAccount: "Cuenta gratuita si aplica a la herramienta",
      duration: "Duracion",
      level: "Nivel",
      students: "Estudiantes",
      rating: "Valoracion",
      instructor: "Instructor",
      instructorBio: "Experto en la materia con anos de experiencia ensenando",
      instructorLanguages: "Espanol · Ingles",
      moduleLabel: (n: number) => `Modulo ${n}`,
      modulesCount: (n: number) => `${n} modulos`,
      resourcesLabel: "Recursos",
      totalDurationLabel: "Duracion total",
      contentDuration: (hours: number) => `${hours}h de contenido`,
      completionLabel: "Al finalizar",
      lifetimeAccessLabel: "Acceso eterno",
      certificateSectionTitle: "Certificado",
      certificateAlt: "Certificado",
      certificateDescription:
        "Al completar este curso, recibiras un certificado digital que puedes agregar a tu perfil profesional y compartir en LinkedIn.",
      levelNames: {
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
      },
      requirementsList: [
        "No se requiere experiencia previa",
        "Computadora con acceso a internet",
        "Ganas de aprender y practicar",
      ],
    },
    courseCard: {
      label: "Curso",
      authorAlt: "Instructor",
      level: {
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
      },
    },
    courseFilters: {
      filters: "Filtros",
      sortBy: "Ordenar",
      mostPopular: "Mas populares",
      mostViewed: "Mas vistos",
      categories: "Categorias",
      design: "Diseno",
      programming: "Programacion",
      databases: "Bases de datos",
      devops: "DevOps",
    },
    coursesScreen: {
      title: "Cursos",
      subtitle: "Explora catalogos curados para reforzar tu aprendizaje.",
      promoTitle: "Potencia tu perfil profesional",
      promoSubtitle: "Accede a rutas de aprendizaje y evaluaciones para preparar tu siguiente paso.",
      promoCta: "Crear cuenta",
      faqTitle: "Preguntas frecuentes",
      faqItems: [
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
      ],
    },
    courseDescription: {
      showMore: "Ver mas",
      showLess: "Ver menos",
    },
  }

  return locale === "es" ? es : en
}
