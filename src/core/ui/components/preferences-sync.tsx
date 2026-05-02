"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/src/core/ui/hooks/use-theme"
import type { PreferenceEntity } from "@/src/features/preferences/domain/entities/preference.entity"
import {
  getUserPreferencesAction,
  saveUserPreferencesAction,
} from "@/src/features/preferences/presentation/states/preferences.actions"

export function PreferencesSync() {
  const [preferences, setPreferences] = useState<PreferenceEntity | null>(null)
  const [loading, setLoading] = useState(true)
  const initialSyncDone = useRef(false)
  const hydratingThemeFromPreferences = useRef(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    let mounted = true

    const loadPreferences = async () => {
      const pref = await getUserPreferencesAction("demo-user")

      if (!mounted) {
        return
      }

      if (pref) {
        setPreferences(pref)
      }

      setLoading(false)
    }

    void loadPreferences()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (loading || !preferences || initialSyncDone.current) {
      return
    }

    if (theme !== preferences.theme) {
      hydratingThemeFromPreferences.current = true
      setTheme(preferences.theme)
    }

    initialSyncDone.current = true
  }, [loading, preferences, setTheme, theme])

  useEffect(() => {
    if (loading || !preferences || !initialSyncDone.current || !theme) {
      return
    }

    if (theme === preferences.theme) {
      hydratingThemeFromPreferences.current = false
      return
    }

    if (hydratingThemeFromPreferences.current) {
      return
    }

    const normalizedTheme =
      theme === "dark" || theme === "light" || theme === "system" ? theme : "system"

    const persistTheme = async () => {
      const updated = await saveUserPreferencesAction({
        ...preferences,
        theme: normalizedTheme,
      })

      setPreferences(updated)
    }

    void persistTheme()
  }, [loading, preferences, theme])

  return null
}
