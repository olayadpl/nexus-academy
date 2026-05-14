"use client"

import { useState, useTransition, useEffect, useCallback } from "react"
import { Folder, FolderPlus, Check, Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/src/core/ui/components/button"
import { Input } from "@/src/core/ui/components/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/core/ui/components/dialog"
import {
  listUserCollectionsAction,
  createCollectionAction,
  toggleBookmarkByResourceAction,
} from "@/src/features/bookmarks/presentation/states/bookmarks.actions"
import { cn } from "@/src/core/ui/lib/utils"
import type { CollectionEntity } from "@/src/features/bookmarks/domain/entities/collection.entity"

type SaveResourceDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  resourceId: string
  courseId: string
  title: string
  onSaved?: () => void
}

export function SaveResourceDialog({ open, onOpenChange, resourceId, courseId, title, onSaved }: SaveResourceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogContentInner 
          resourceId={resourceId}
          courseId={courseId}
          title={title}
          onOpenChange={onOpenChange}
          onSaved={onSaved}
        />
      </DialogContent>
    </Dialog>
  )
}

function DialogContentInner({ resourceId, courseId, title, onOpenChange, onSaved }: {
  resourceId: string
  courseId: string
  title: string
  onOpenChange: (open: boolean) => void
  onSaved?: () => void
}) {
  const [collections, setCollections] = useState<CollectionEntity[]>([])
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    void listUserCollectionsAction().then((cols) => {
      setCollections(cols)
    })
  }, [])

  const handleSaveToCollection = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedCollectionId) return

    startTransition(async () => {
      await toggleBookmarkByResourceAction({
        resourceId,
        courseId,
        title,
        collectionId: selectedCollectionId,
      })
      onOpenChange(false)
      onSaved?.()
      toast.success("Resource saved", {
        description: title,
        duration: 4000,
      })
    })
  }, [resourceId, courseId, title, selectedCollectionId, onOpenChange, onSaved])

  const handleCreateAndSave = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!newCollectionName.trim()) return

    startTransition(async () => {
      const newCollection = await createCollectionAction(newCollectionName.trim())
      setCollections((prev) => [newCollection, ...prev])
      
      await toggleBookmarkByResourceAction({
        resourceId,
        courseId,
        title,
        collectionId: newCollection.id,
      })
      
      onOpenChange(false)
      onSaved?.()
      toast.success(`Saved to "${newCollection.name}"`, {
        description: title,
        duration: 5000,
      })
    })
  }, [newCollectionName, resourceId, courseId, title, onOpenChange, onSaved])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Save to collection</DialogTitle>
        <DialogDescription>Select a folder or create a new one for this resource.</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        {collections.length > 0 && !isCreating && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Your folders</div>
            <div className="max-h-48 space-y-1 overflow-y-auto">
              {collections.map((collection) => (
                <button
                  type="button"
                  key={collection.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCollectionId(collection.id)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                    selectedCollectionId === collection.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Folder className="h-4 w-4" />
                  <span className="flex-1 truncate">{collection.name}</span>
                  {selectedCollectionId === collection.id && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {isCreating ? (
          <div className="flex gap-2">
            <Input
              placeholder="Folder name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleCreateAndSave()
                }
              }}
              className="flex-1"
              autoFocus
            />
            <Button 
              type="button" 
              onClick={handleCreateAndSave}
              size="sm"
              disabled={!newCollectionName.trim() || isPending}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsCreating(true)
            }}
            className="flex w-full items-center gap-2 rounded-md border border-dashed border-input px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <FolderPlus className="h-4 w-4" />
            <span>Create new folder</span>
          </button>
        )}
      </div>

      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenChange(false) }}
        >
          Cancel
        </Button>
        {isCreating ? (
          <Button 
            type="button" 
            onClick={handleCreateAndSave}
            disabled={!newCollectionName.trim() || isPending}
          >
            {isPending ? "Saving..." : "Create & Save"}
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={handleSaveToCollection} 
            disabled={!selectedCollectionId || isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        )}
      </DialogFooter>
    </>
  )
}