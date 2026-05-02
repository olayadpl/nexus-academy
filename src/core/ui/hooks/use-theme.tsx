"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (t: Theme | ((prev: Theme) => Theme)) => void
  systemTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children, defaultTheme = "system" }: { children: React.ReactNode; defaultTheme?: Theme }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme as Theme)
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null
      if (stored) setThemeState(stored)
      else setThemeState(defaultTheme as Theme)
    } catch (e) {
      setThemeState(defaultTheme as Theme)
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => setSystemTheme(mq.matches ? "dark" : "light")
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [defaultTheme])

  useEffect(() => {
    const applied = theme === "system" ? systemTheme : theme
    const html = document.documentElement
    // apply class on html
    html.classList.remove("light", "dark")
    html.classList.add(applied)
    // set color-scheme
    html.style.colorScheme = applied
  }, [theme, systemTheme])

  const setTheme = (t: Theme | ((p: Theme) => Theme)) => {
    setThemeState((prev) => {
      const next = typeof t === "function" ? (t as (p: Theme) => Theme)(prev) : t
      try {
        localStorage.setItem("theme", next)
      } catch (e) {}
      return next
    })
  }

  const resolvedTheme = theme === "system" ? systemTheme : (theme as "light" | "dark")

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme, systemTheme }), [theme, resolvedTheme, systemTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const v = useContext(ThemeContext)
  if (!v) {
    // fallback to a safe default to avoid crashes
    return {
      theme: "system" as Theme,
      resolvedTheme: "light" as "light" | "dark",
      setTheme: () => {},
      systemTheme: "light" as "light" | "dark",
    }
  }
  return v
}
