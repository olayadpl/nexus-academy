"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode, PointerEvent as ReactPointerEvent } from "react"

const COLLAPSED_PX = 72
const SIDE_MIN_PX = 200
const SIDE_DEFAULT_PX = 320
const RESIZER_PX = 4
const MAIN_MIN_PX = 420

type ColumnRenderProps = {
  collapsed: boolean
  onToggle: () => void
}

type LayoutColumnsProps = {
  left: (props: ColumnRenderProps) => ReactNode
  main: ReactNode
  right: (props: ColumnRenderProps) => ReactNode
}

function useResizablePanels() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const leftResizeStartXRef = useRef<number | null>(null)
  const rightResizeStartXRef = useRef<number | null>(null)

  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)
  const [leftWidthPx, setLeftWidthPx] = useState(SIDE_DEFAULT_PX)
  const [rightWidthPx, setRightWidthPx] = useState(SIDE_DEFAULT_PX)
  const [leftPrevWidthPx, setLeftPrevWidthPx] = useState(SIDE_DEFAULT_PX)
  const [rightPrevWidthPx, setRightPrevWidthPx] = useState(SIDE_DEFAULT_PX)
  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)

  const toggleLeft = useCallback(() => {
    if (leftCollapsed) {
      setLeftCollapsed(false)
      setLeftWidthPx(SIDE_DEFAULT_PX)
      return
    }
    setLeftPrevWidthPx(leftWidthPx)
    setLeftCollapsed(true)
    setLeftWidthPx(COLLAPSED_PX)
  }, [leftCollapsed, leftWidthPx])

  const toggleRight = useCallback(() => {
    if (rightCollapsed) {
      setRightCollapsed(false)
      setRightWidthPx(SIDE_DEFAULT_PX)
      return
    }
    setRightPrevWidthPx(rightWidthPx)
    setRightCollapsed(true)
    setRightWidthPx(COLLAPSED_PX)
  }, [rightCollapsed, rightWidthPx])

  const stopResizing = useCallback(() => {
    setIsResizingLeft(false)
    setIsResizingRight(false)
    leftResizeStartXRef.current = null
    rightResizeStartXRef.current = null
  }, [])

  const handleResize = useCallback(
    (event: PointerEvent) => {
      const container = containerRef.current?.getBoundingClientRect()
      if (!container) return

      const rightCurrent = rightCollapsed ? COLLAPSED_PX : rightWidthPx
      const leftCurrent = leftCollapsed ? COLLAPSED_PX : leftWidthPx

      if (isResizingLeft) {
        const nextWidth = event.clientX - container.left
        if (nextWidth < 60) {
          if (!leftCollapsed) setLeftPrevWidthPx(leftWidthPx)
          setLeftCollapsed(true)
          setLeftWidthPx(COLLAPSED_PX)
          return
        }
        const maxLeft = Math.max(SIDE_MIN_PX, container.width - rightCurrent - MAIN_MIN_PX - RESIZER_PX * 2)
        setLeftCollapsed(false)
        setLeftWidthPx(Math.min(Math.max(nextWidth, SIDE_MIN_PX), maxLeft))
      }

      if (isResizingRight) {
        const nextWidth = container.right - event.clientX
        if (nextWidth < 60) {
          if (!rightCollapsed) setRightPrevWidthPx(rightWidthPx)
          setRightCollapsed(true)
          setRightWidthPx(COLLAPSED_PX)
          return
        }
        const maxRight = Math.max(SIDE_MIN_PX, container.width - leftCurrent - MAIN_MIN_PX - RESIZER_PX * 2)
        setRightCollapsed(false)
        setRightWidthPx(Math.min(Math.max(nextWidth, SIDE_MIN_PX), maxRight))
      }
    },
    [isResizingLeft, isResizingRight, leftCollapsed, leftWidthPx, rightCollapsed, rightWidthPx]
  )

  useEffect(() => {
    if (!isResizingLeft && !isResizingRight) return

    const onPointerMove = (event: PointerEvent) => handleResize(event)
    const onPointerUp = () => stopResizing()

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [handleResize, isResizingLeft, isResizingRight, stopResizing])

  const startLeftResize = (event: ReactPointerEvent) => {
    event.preventDefault()
    event.stopPropagation()
    leftResizeStartXRef.current = event.clientX
    setIsResizingLeft(true)
  }

  const startRightResize = (event: ReactPointerEvent) => {
    event.preventDefault()
    event.stopPropagation()
    rightResizeStartXRef.current = event.clientX
    setIsResizingRight(true)
  }

  return {
    containerRef,
    leftCollapsed,
    rightCollapsed,
    leftWidthPx,
    rightWidthPx,
    isResizingLeft,
    isResizingRight,
    toggleLeft,
    toggleRight,
    startLeftResize,
    startRightResize,
  }
}

export function LayoutColumns({ left, main, right }: LayoutColumnsProps) {
  const {
    leftCollapsed,
    rightCollapsed,
    leftWidthPx,
    rightWidthPx,
    isResizingLeft,
    isResizingRight,
    toggleLeft,
    toggleRight,
    containerRef,
    startLeftResize,
    startRightResize,
  } = useResizablePanels()

  return (
    <div className="flex h-[calc(100svh-3.5rem)] max-h-[calc(100svh-3.5rem)] min-h-0 flex-col overflow-hidden bg-muted/30 font-sans">
      <div className="flex flex-1 min-h-0 overflow-hidden p-2.5">
        <div className="w-full h-full min-h-0">
          <div className="w-full min-h-0 h-full relative flex items-stretch" ref={containerRef}>
            <div
              className="hidden lg:flex lg:h-full lg:min-h-0 lg:max-h-full lg:flex-col shrink-0 transition-[width] duration-150 relative self-stretch"
              style={{ width: leftCollapsed ? COLLAPSED_PX : leftWidthPx }}
            >
              {left({ collapsed: leftCollapsed, onToggle: toggleLeft })}
              {leftCollapsed && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 right-0"
                  style={{ width: RESIZER_PX, cursor: "col-resize", zIndex: 30 }}
                  onPointerDown={startLeftResize}
                />
              )}
            </div>

            <div
              className="hidden lg:block h-full shrink-0 cursor-col-resize hover:bg-border/60 active:bg-border/80"
              style={{ width: RESIZER_PX }}
              onPointerDown={startLeftResize}
            />

            <div
              className={
                leftCollapsed
                  ? "relative min-w-0 min-h-0 h-full max-h-full flex-1 self-stretch rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md overflow-hidden"
                  : "relative min-w-0 min-h-0 h-full max-h-full flex-1 self-stretch rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden"
              }
            >
              {main}
            </div>

            <div
              className="hidden lg:block h-full shrink-0 cursor-col-resize hover:bg-border/60 active:bg-border/80"
              style={{ width: RESIZER_PX }}
              onPointerDown={startRightResize}
            />

            <div
              className="hidden lg:flex lg:h-full lg:min-h-0 lg:max-h-full lg:flex-col shrink-0 transition-[width] duration-150 relative self-stretch"
              style={{ width: rightCollapsed ? COLLAPSED_PX : rightWidthPx }}
            >
              {right({ collapsed: rightCollapsed, onToggle: toggleRight })}
              {rightCollapsed && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 left-0"
                  style={{ width: RESIZER_PX, cursor: "col-resize", zIndex: 30 }}
                  onPointerDown={startRightResize}
                />
              )}
            </div>

            {(isResizingLeft || isResizingRight) && (
              <div className="hidden lg:block absolute inset-0 z-40 bg-transparent cursor-col-resize" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
