"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Globe, Moon, Sun } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import type { PreferenceEntity } from "../../domain/entities/preference.entity"
import { saveUserPreferencesAction } from "../states/preferences.actions"

type PreferencesClientControlsProps = {
  preferences: PreferenceEntity
}

export function PreferencesClientControls({ preferences }: PreferencesClientControlsProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const updatePreferences = (patch: Partial<PreferenceEntity>) => {
    startTransition(async () => {
      await saveUserPreferencesAction({
        ...preferences,
        ...patch,
      })
      router.refresh()
    })
  }

  return (
    <>
      <div>
        <p className="mb-2 text-sm font-medium">Tema</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={preferences.theme === "light" ? "default" : "outline"}
            size="sm"
            disabled={isPending}
            onClick={() => updatePreferences({ theme: "light" })}
          >
            <Sun className="mr-2 h-4 w-4" />
            Claro
          </Button>
          <Button
            variant={preferences.theme === "dark" ? "default" : "outline"}
            size="sm"
            disabled={isPending}
            onClick={() => updatePreferences({ theme: "dark" })}
          >
            <Moon className="mr-2 h-4 w-4" />
            Oscuro
          </Button>
          <Button
            variant={preferences.theme === "system" ? "default" : "outline"}
            size="sm"
            disabled={isPending}
            onClick={() => updatePreferences({ theme: "system" })}
          >
            Sistema
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Idioma</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={preferences.language === "es" ? "default" : "outline"}
            size="sm"
            disabled={isPending}
            onClick={() => updatePreferences({ language: "es" })}
          >
            <Globe className="mr-2 h-4 w-4" />
            Espanol
          </Button>
          <Button
            variant={preferences.language === "en" ? "default" : "outline"}
            size="sm"
            disabled={isPending}
            onClick={() => updatePreferences({ language: "en" })}
          >
            <Globe className="mr-2 h-4 w-4" />
            English
          </Button>
        </div>
      </div>
    </>
  )
}
