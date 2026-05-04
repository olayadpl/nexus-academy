"use client"

import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/src/core/ui/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  hideSeparator,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
  hideSeparator?: boolean
}) {
  // extract any existing pointer capture handlers to forward when not hidden
  const { onPointerDownCapture, onPointerDown, ...rest } = props as any

  const handlePointerDownCapture = (e: React.PointerEvent) => {
    if (hideSeparator) {
      // prevent library handlers from running and attempting setPointerCapture
      try {
        e.preventDefault()
      } catch {}
      try {
        e.stopPropagation()
      } catch {}
      try {
        ;(e.nativeEvent as PointerEvent).stopImmediatePropagation?.()
      } catch {}
      return
    }

    if (typeof onPointerDownCapture === "function") onPointerDownCapture(e)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (hideSeparator) return
    if (typeof onPointerDown === "function") onPointerDown(e)
  }

  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      onPointerDownCapture={handlePointerDownCapture}
      onPointerDown={handlePointerDown}
      className={cn(
        "relative flex items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90 touch-none aria-[orientation=vertical]:cursor-col-resize aria-[orientation=horizontal]:cursor-row-resize",
        hideSeparator ? "w-1 bg-transparent after:bg-transparent" : "w-px bg-border",
        className
      )}
      {...rest}
    >
      {withHandle && !hideSeparator && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
