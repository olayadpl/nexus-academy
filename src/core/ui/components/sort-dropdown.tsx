import { NativeSelect, NativeSelectOption } from "@/src/core/ui/components/native-select"

type SortValue = "popular" | "recent" | "rating"

type SortDropdownProps = {
  value: SortValue
  name?: string
}

export function SortDropdown({ value, name = "sort" }: SortDropdownProps) {
  return (
    <NativeSelect name={name} defaultValue={value} className="min-w-40">
      <NativeSelectOption value="recent">Mas reciente</NativeSelectOption>
      <NativeSelectOption value="rating">Mejor calificado</NativeSelectOption>
    </NativeSelect>
  )
}
