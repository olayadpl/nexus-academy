# Patrones de Diseño de React en Nexus Academy

Este documento ejemplifica tres de los patrones de diseño clave de React utilizando código real de nuestra plataforma.

## 1. Componentes Compuestos (Compound Components)

Este patrón permite crear componentes complejos dividiéndolos en pequeñas piezas que comparten un mismo contexto implícitamente o están diseñadas para funcionar en conjunto, proporcionando una API declarativa. 

**Ejemplo de nuestra plataforma**: Implementación de las pestañas en `src/core/ui/components/tabs.tsx`.

```tsx
"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@/src/core/ui/lib/utils"

// Componente Contenedor Padre
function Tabs({ className, orientation = "horizontal", ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  )
}

// Componentes Hijos diseñados para uso compuesto
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("...", className)} {...props} />
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return <TabsPrimitive.Trigger className={cn("...", className)} {...props} />
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("...", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

*Uso:*
```tsx
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">Pestaña 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Contenido de la Pestaña</TabsContent>
</Tabs>
```

---

## 2. Composición de componentes con Hooks (Custom Hooks)

Aislamos la lógica reactiva con estado en funciones reutilizables desvinculadas de la UI, facilitando una estructura más modular y fácil de consumir independientemente del componente gráfico.

**Ejemplo de nuestra plataforma**: Detección de dispositivos móviles orientada a eventos en `src/core/ui/hooks/use-mobile.ts`.

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Manejo del estado encapsulado
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Lógica del ciclo de vida y eventos aislada de cualquier vista
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

---

## 3. Gestión de datos con Proveedores (Context API / Provider Pattern)

Utilizamos un componente Proveedor (Provider) para empaquetar una porción global de configuración o estado e inyectarla en todo el árbol de componentes para evitar pasar propiedades componente por componente (prop-drilling).

**Ejemplo de nuestra plataforma**: Manejo de la localización idiomática global en `src/core/ui/components/locale-provider.tsx`.

```tsx
"use client"

import { createContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Locale } from "@/src/lib/i18n/translations"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

// 1. Creación del contexto
export const LocaleContext = createContext<LocaleContextValue | null>(null)

type LocaleProviderProps = {
  initialLocale?: Locale
  children: ReactNode
}

// 2. Componente Proveedor de Orden Superior (HOC)
export function LocaleProvider({ initialLocale = "es", children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    setLocale(initialLocale)
  }, [initialLocale])

  // Lógica global atada al contexto (ej. Mutaciones del DOM global)
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  // 3. Provisión de los datos a los componentes hijos
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
```

*Uso de su estado usando hooks auxiliares:*
```tsx
const { locale, setLocale } = useContext(LocaleContext)
```
