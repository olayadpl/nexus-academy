"use client"

import * as React from "react"
import { cn } from "@/src/core/ui/lib/utils"
import { PanelLeftIcon, PanelRightIcon } from "lucide-react"

type ThreePanelProps = {
  left?: React.ReactNode
  right?: React.ReactNode
  children?: React.ReactNode
  className?: string
  // initial widths in pixels
  initialLeft?: number
  initialRight?: number
  minLeft?: number
  minRight?: number
  collapsedIconWidth?: number
  persistKey?: string
}

export function ThreePanelLayout({
  left,
  right,
  children,
  className,
  initialLeft = 280,
  initialRight = 320,
  minLeft = 56,
  minRight = 56,
  collapsedIconWidth = 64,
  persistKey = "three-panel-layout",
}: ThreePanelProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  // Restore persisted sizes if present
  const [leftWidth, setLeftWidth] = React.useState<number>(() => {
    try {
      const raw = localStorage.getItem(persistKey + ":left")
      return raw ? Number(raw) : initialLeft
    } catch {
      return initialLeft
    }
  })
  const [rightWidth, setRightWidth] = React.useState<number>(() => {
    try {
      const raw = localStorage.getItem(persistKey + ":right")
      return raw ? Number(raw) : initialRight
    } catch {
      return initialRight
    }
  })

  const [leftCollapsed, setLeftCollapsed] = React.useState<boolean>(() => leftWidth <= minLeft)
  const [rightCollapsed, setRightCollapsed] = React.useState<boolean>(() => rightWidth <= minRight)

  // persist sizes
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ":left", String(leftWidth))
      localStorage.setItem(persistKey + ":right", String(rightWidth))
    } catch {}
  }, [leftWidth, rightWidth, persistKey])

  React.useEffect(() => {
    setLeftCollapsed(leftWidth <= minLeft)
  }, [leftWidth, minLeft])

  React.useEffect(() => {
    setRightCollapsed(rightWidth <= minRight)
  }, [rightWidth, minRight])

  // Drag handlers
  function startDrag(
    side: "left" | "right",
    e: React.MouseEvent | React.TouchEvent
  ) {
    e.preventDefault()
    const startX = isTouchEvent(e) ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const startLeft = leftWidth
    const startRight = rightWidth
    const minMain = 240
    const handleTotal = 24 // total reserved space for handles/gaps

    // prevent text selection while dragging
    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    function onMove(ev: MouseEvent | TouchEvent) {
      const clientX = isTouch(ev) ? ev.touches[0].clientX : (ev as MouseEvent).clientX
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      if (side === "left") {
        const maxLeft = Math.max(minLeft, rect.width - startRight - minMain - handleTotal)
        const newWidth = clamp(startLeft + (clientX - startX), minLeft, maxLeft)
        setLeftWidth(newWidth)
      } else {
        const maxRight = Math.max(minRight, rect.width - startLeft - minMain - handleTotal)
        const newWidth = clamp(startRight - (clientX - startX), minRight, maxRight)
        setRightWidth(newWidth)
      }
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove, { passive: false })
    window.addEventListener("touchend", onUp)
  }

  function toggleCollapse(side: "left" | "right") {
    if (side === "left") {
      if (leftCollapsed) {
        setLeftWidth(initialLeft)
      } else {
        setLeftWidth(collapsedIconWidth)
      }
      setLeftCollapsed((c) => !c)
    } else {
      if (rightCollapsed) {
        setRightWidth(initialRight)
      } else {
        setRightWidth(collapsedIconWidth)
      }
      setRightCollapsed((c) => !c)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("three-panel-layout relative h-full w-full overflow-hidden", className)}
      style={{ height: "100%" }}
      data-component="three-panel"
    >
      <div
        className="grid h-full w-full select-none"
        style={{
          gridTemplateColumns: `${leftWidth}px 12px minmax(0,1fr) 12px ${rightWidth}px`,
        }}
      >
        <aside
          data-slot="left"
          className={cn(
            "flex min-h-0 flex-col bg-sidebar text-sidebar-foreground overflow-hidden transition-width duration-150",
            leftCollapsed ? "opacity-80" : ""
          )}
          style={{ width: leftWidth, minWidth: leftCollapsed ? collapsedIconWidth : minLeft }}
        >
          <div className="flex items-center justify-end p-2">
            <button
              aria-label="Toggle left sidebar"
              onClick={() => toggleCollapse("left")}
              className="size-7 rounded-md border bg-card p-1 text-muted-foreground hover:bg-accent"
            >
              <PanelLeftIcon />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 overflow-auto p-2">{left}</div>
        </aside>

        {/* left handle */}
        <div
          role="separator"
          aria-orientation="vertical"
          className="-mx-2 flex items-stretch justify-center px-1"
          onMouseDown={(e) => startDrag("left", e)}
          onTouchStart={(e) => startDrag("left", e)}
        >
          <div className="w-0.5 cursor-col-resize rounded bg-border" />
        </div>

        <main className="min-h-0 overflow-auto p-2">{children}</main>

        {/* right handle */}
        <div
          role="separator"
          aria-orientation="vertical"
          className="-mx-2 flex items-stretch justify-center px-1"
          onMouseDown={(e) => startDrag("right", e)}
          onTouchStart={(e) => startDrag("right", e)}
        >
          <div className="w-0.5 cursor-col-resize rounded bg-border" />
        </div>

        <aside
          data-slot="right"
          className={cn(
            "flex min-h-0 flex-col bg-sidebar text-sidebar-foreground overflow-hidden transition-width duration-150",
            rightCollapsed ? "opacity-80" : ""
          )}
          style={{ width: rightWidth, minWidth: rightCollapsed ? collapsedIconWidth : minRight }}
        >
          <div className="flex items-start p-2">
            <button
              aria-label="Toggle right sidebar"
              onClick={() => toggleCollapse("right")}
              className="size-7 rounded-md border bg-card p-1 text-muted-foreground hover:bg-accent"
            >
              <PanelRightIcon />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 overflow-auto p-2">{right}</div>
        </aside>
      </div>
    </div>
  )
}

// helpers
function isTouchEvent(e: any): e is React.TouchEvent {
  return typeof (e as React.TouchEvent).touches !== "undefined"
}

function isTouch(e: any): e is TouchEvent {
  return typeof (e as TouchEvent).touches !== "undefined"
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v))
}

export default ThreePanelLayout
