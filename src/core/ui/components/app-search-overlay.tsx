"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/core/ui/components/command"
import { SEARCH_FIXTURES } from "@/src/features/search/data/datasources/mock/search-mock.ds"

type AppSearchOverlayProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NAV_ITEMS = [
  { href: "/explore", label: "Explorar", hint: "Descubrir contenido" },
  { href: "/courses", label: "Cursos", hint: "Catalogo de cursos" },
  { href: "/career-paths", label: "Rutas", hint: "Rutas de aprendizaje" },
  { href: "/briefs", label: "Investigacion", hint: "Retos y proyectos" },
  { href: "/assessments", label: "Evaluaciones", hint: "Autoevaluaciones" },
  { href: "/bookmarks", label: "Biblioteca", hint: "Recursos guardados" },
  { href: "/history", label: "Historial", hint: "Actividad reciente" },
  { href: "/settings", label: "Ajustes", hint: "Preferencias de usuario" },
  { href: "/collections", label: "Repositorio", hint: "Colecciones y curacion" },
]

const SEARCHABLE_ITEMS = SEARCH_FIXTURES.map((item) => ({
  id: item.id,
  href: `/search?q=${encodeURIComponent(item.title)}`,
  label: item.title,
  hint: item.description,
  value: `${item.title} ${item.description} ${item.category}`,
}))

export function AppSearchOverlay({ open, onOpenChange }: AppSearchOverlayProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const normalizedQuery = query.trim().toLowerCase()

  const filteredResults = useMemo(() => {
    if (!normalizedQuery) {
      return SEARCHABLE_ITEMS.slice(0, 6)
    }

    return SEARCHABLE_ITEMS.filter((item) => item.value.toLowerCase().includes(normalizedQuery)).slice(0, 8)
  }, [normalizedQuery])

  const goTo = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  const submitSearch = (value: string) => {
    const normalized = value.trim()

    if (!normalized) {
      return
    }

    onOpenChange(false)
    router.push(`/search?q=${encodeURIComponent(normalized)}`)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Buscar"
      description="Busca una ruta o seccion"
      className="max-w-2xl"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            submitSearch(query)
          }
        }}
        placeholder="Buscar recursos, cursos o apps..."
      />
      <CommandList>
        <CommandEmpty>Sin resultados.</CommandEmpty>
        <CommandGroup heading="Resultados">
          {filteredResults.map((item) => (
            <CommandItem key={item.id} value={item.value} onSelect={() => goTo(item.href)}>
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.hint}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navegacion">
          {NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.href}
              value={`${item.label} ${item.hint} ${item.href}`}
              onSelect={() => goTo(item.href)}
            >
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.hint}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Cuenta">
          <CommandItem value="Entrar login" onSelect={() => goTo("/login")}>Iniciar sesion</CommandItem>
          <CommandItem value="Registro signup" onSelect={() => goTo("/signup")}>Registrarse</CommandItem>
          <CommandItem value="Perfil" onSelect={() => goTo("/profile")}>Perfil</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
