"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Bookmark } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import {
  getBookmarkByResourceAction,
  toggleBookmarkByResourceAction,
} from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { cn } from "@/src/core/ui/lib/utils"
import { SaveResourceDialog } from "./save-resource-dialog"

type SaveResourceButtonProps = {
  resourceId: string
  courseId: string
  title: string
  className?: string
}

export function SaveResourceButton({ resourceId, courseId, title, className }: SaveResourceButtonProps) {
  const router = useRouter()
  const [bookmarked, setBookmarked] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [showDialog, setShowDialog] = useState(false)

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (bookmarked) {
      startTransition(async () => {
        const result = await toggleBookmarkByResourceAction({ resourceId, courseId, title })
        setBookmarked(result.bookmarked)
        router.refresh()
      })
      return
    }

    setShowDialog(true)
  }

  const handleSaved = () => {
    setBookmarked(true)
    router.refresh()
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9 rounded-full bg-transparent border-none shadow-none", className)}
        aria-label={bookmarked ? "Quitar de guardados" : "Guardar recurso"}
        disabled={isPending}
        onClick={handleClick}
      >
        <Bookmark className={cn("h-4 w-4 text-white", bookmarked && "fill-current text-white")} />
      </Button>

      <SaveResourceDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        resourceId={resourceId}
        courseId={courseId}
        title={title}
        onSaved={handleSaved}
      />
    </>
  )
}