"use client"

import { useCallback, useState } from "react"

type OpenAuthModalOptions = {
  reason?: string
}

export function useAuthModalState() {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState<string | undefined>()

  const open = useCallback((options?: OpenAuthModalOptions) => {
    setReason(options?.reason)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    reason,
    open,
    close,
    setIsOpen,
  }
}
