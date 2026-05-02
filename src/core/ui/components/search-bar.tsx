 "use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/src/core/ui/components/input"
import { cn } from "@/src/core/ui/lib/utils"

type SearchBarProps = {
  action?: string
  defaultValue?: string
  placeholder?: string
  queryParamName?: string
  className?: string
  children?: React.ReactNode
}

export function SearchBar({
  action = "/search",
  defaultValue = "",
  placeholder = "Buscar por curso, tema o palabra clave",
  queryParamName = "q",
  className,
  children,
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)

  useEffect(() => {
    setQuery(defaultValue)
  }, [defaultValue])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = query.trim()
    const target = normalized ? `${action}?${queryParamName}=${encodeURIComponent(normalized)}` : action
    router.push(target)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full max-w-2xl", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        name={queryParamName}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-full pl-10"
      />
      {children}
    </form>
  )
}
