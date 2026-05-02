"use client"

import { ThemeProvider as LocalThemeProvider } from "@/src/core/ui/hooks/use-theme"
import type { ThemeProviderProps } from "next-themes"

// Simple adapter: use local ThemeProvider implementation to avoid next-themes' injected script
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <LocalThemeProvider>{children}</LocalThemeProvider>
}
