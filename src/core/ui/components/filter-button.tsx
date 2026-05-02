import { Filter } from "lucide-react"
import { cn } from "@/src/core/ui/lib/utils"

type FilterButtonProps = React.ComponentProps<"button"> & {
  active?: boolean
}

export function FilterButton({ active = false, className, children, ...props }: FilterButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-foreground hover:bg-muted",
        className
      )}
      {...props}
    >
      <Filter className="h-4 w-4" />
      <span>{children ?? "Filtros"}</span>
    </button>
  )
}
