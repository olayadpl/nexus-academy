import { listBriefsAction } from "../states/briefs.actions"
import { BriefCard } from "../components/brief-card"
import { getTranslations } from "@/src/lib/i18n/translations"
import { getUserLocale } from "@/src/lib/i18n/get-locale"

export async function BriefsScreen() {
  const locale = await getUserLocale()
  const t = getTranslations(locale)
  const briefs = await listBriefsAction()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{t.briefs.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.briefs.subtitle}</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {briefs.map((brief, idx) => (
          <BriefCard key={brief.id} brief={brief} index={idx} />
        ))}
      </section>
    </main>
  )
}
