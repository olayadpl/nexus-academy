import Link from "next/link"

export function AppFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-3 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-foreground">Terminos</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacidad</Link>
          <Link href="/contact" className="hover:text-foreground">Contacto</Link>
        </div>
        <p>© {year} UCI</p>
      </div>
    </footer>
  )
}
