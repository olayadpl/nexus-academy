"use client"

import { createContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Locale } from "@/src/lib/i18n/translations"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

type LocaleProviderProps = {
  initialLocale?: Locale
  children: ReactNode
}

export function LocaleProvider({ initialLocale = "es", children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    setLocale(initialLocale)
  }, [initialLocale])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
