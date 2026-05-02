"use client"

import * as React from "react"
import Script from "next/script"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "@/src/core/ui/hooks/use-theme"
import { Button } from "@/src/core/ui/components/button"
import { useMetaColor } from "@/src/core/ui/hooks/use-meta-color"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/core/ui/components/dropdown-menu"

export const DARK_MODE_FORWARD_TYPE = "dark-mode-forward"

const icons = {
  light: <Sun className="h-4 w-4" />,
  dark: <Moon className="h-4 w-4" />,
  system: <Monitor className="h-4 w-4" />,
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const { setMetaColor, metaColor } = useMetaColor()

  React.useEffect(() => {
    const dark = theme === "dark"
    setMetaColor(dark ? "#09090b" : "#ffffff")
  }, [theme, setMetaColor])

  React.useEffect(() => {
    setMetaColor(metaColor)
  }, [metaColor, setMetaColor])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {icons[theme === "dark" || theme === "light" ? theme : "system"]}
          <span className="sr-only">Tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DarkModeScript() {
  // Attach the listener on the client with useEffect (no script tags)
  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as Element | null
      if ((e as KeyboardEvent) && (e as KeyboardEvent).key) {
        const key = (e as KeyboardEvent).key
        if ((key === "d" || key === "D") && !(e as any).metaKey && !(e as any).ctrlKey && !(e as any).altKey) {
          if (
            (target instanceof HTMLElement && (target as HTMLElement).isContentEditable) ||
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement
          ) {
            return
          }
          e.preventDefault()
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              type: DARK_MODE_FORWARD_TYPE,
              key: key,
            }, "*")
          }
        }
      }
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  return null
}
