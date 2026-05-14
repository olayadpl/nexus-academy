"use client"

import Link from "next/link"
import { useLocale } from "@/src/core/ui/hooks/use-locale"
import { getTranslations } from "@/src/lib/i18n/translations"

export function AppFooter() {
  const year = new Date().getFullYear()
  const { locale } = useLocale()
  const t = getTranslations(locale)

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-3 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-foreground">{t.footer.terms}</Link>
          <Link href="/privacy" className="hover:text-foreground">{t.footer.privacy}</Link>
          <Link href="/contact" className="hover:text-foreground">{t.footer.contact}</Link>
        </div>
        <p>© {year} UCI</p>
      </div>
    </footer>
  )
}
