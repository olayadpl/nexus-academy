"use client"

import { useEffect, useState, useTransition } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import {
  getBookmarkByResourceAction,
  toggleBookmarkByResourceAction,
} from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { cn } from "@/src/core/ui/lib/utils"

type SaveResourceButtonProps = {
  resourceId: string
  courseId: string
  title: string
  className?: string
}

export function SaveResourceButton({ resourceId, courseId, title, className }: SaveResourceButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    let active = true

    void getBookmarkByResourceAction(resourceId).then((bookmark) => {
      if (active) {
        setBookmarked(Boolean(bookmark))
      }
    })

    return () => {
      active = false
    }
  }, [resourceId])

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9 rounded-full bg-transparent border-none shadow-none", className)}
      aria-label={bookmarked ? "Quitar de guardados" : "Guardar recurso"}
      disabled={isPending}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()

        startTransition(async () => {
          const result = await toggleBookmarkByResourceAction({
            resourceId,
            courseId,
            title,
          })
          setBookmarked(result.bookmarked)
        })
      }}
    >
      <Bookmark className={cn("h-4 w-4 text-white", bookmarked && "fill-current text-white")} />
    </Button>
  )
}

