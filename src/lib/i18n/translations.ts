export type Locale = "es" | "en"

export function getTranslations(locale: Locale = "es") {
  // Minimal translations used by course page. Extend as needed.
  const en = {
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
  }

  const es = {
    courses: "Cursos",
    startCourse: "Comenzar curso",
    preview: "Vista previa",
    whatYouWillLearn: "Lo que aprenderás",
    courseContent: "Contenido del curso",
    requirements: "Requisitos",
    includes: "Este curso incluye",
    includedResources: (n: number) => `${n} recursos`,
    accessLifetime: "Acceso de por vida",
    certificate: "Certificado de finalización",
    noPrereq: "No se requiere experiencia previa",
    accessInternet: "Computadora con acceso a internet",
    toolAccount: "Cuenta gratuita si aplica a la herramienta",
  }

  return locale === "es" ? es : en
}
