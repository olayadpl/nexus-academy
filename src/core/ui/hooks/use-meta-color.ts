"use client"

import * as React from "react"

function upsertMetaThemeColor(value: string) {
  let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null

  if (!meta) {
    meta = document.createElement("meta")
    meta.name = "theme-color"
    document.head.appendChild(meta)
  }

  meta.content = value
}

export function useMetaColor() {
  const [metaColor, setMetaColorState] = React.useState("#ffffff")

  React.useEffect(() => {
    const current = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null
    if (current?.content) {
      setMetaColorState(current.content)
    }
  }, [])

  const setMetaColor = React.useCallback((value: string) => {
    setMetaColorState(value)
    upsertMetaThemeColor(value)
  }, [])

  return { metaColor, setMetaColor }
}
