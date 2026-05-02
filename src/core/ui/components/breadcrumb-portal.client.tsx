"use client"

import React from "react"

export default function BreadcrumbPortal({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const originalParentRef = React.useRef<Element | null>(null)
  const originalNextSiblingRef = React.useRef<ChildNode | null>(null)

  React.useEffect(() => {
    let mounted = true
    const container = ref.current
    if (!container) return

    function moveBreadcrumb(el: Element) {
      if (!mounted || !container) return
      // Save original position so we can restore on unmount
      originalParentRef.current = el.parentElement
      originalNextSiblingRef.current = el.nextSibling
      container.appendChild(el)
    }

    function tryFind() {
      const el = document.querySelector('[data-slot="breadcrumb"]')
      if (el) {
        moveBreadcrumb(el)
        return true
      }
      return false
    }

    if (!tryFind()) {
      const observer = new MutationObserver(() => {
        if (tryFind()) {
          observer.disconnect()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
      return () => {
        mounted = false
        observer.disconnect()
      }
    }

    return () => {
      mounted = false
      // on unmount try to restore
      const el = container.querySelector('[data-slot="breadcrumb"]')
      if (el && originalParentRef.current) {
        if (originalNextSiblingRef.current && originalParentRef.current.contains(originalNextSiblingRef.current)) {
          originalParentRef.current.insertBefore(el, originalNextSiblingRef.current)
        } else {
          originalParentRef.current.appendChild(el)
        }
      }
    }
  }, [])

  return <div ref={ref} className={className} data-breadcrumb-portal />
}
