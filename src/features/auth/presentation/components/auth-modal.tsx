"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/core/ui/components/dialog"
import { Button } from "@/src/core/ui/components/button"

type AuthModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  reason?: string
  onGoogleLogin?: () => void
  onCasLogin?: () => void
}

export function AuthModal({
  open,
  onOpenChange,
  reason,
  onGoogleLogin,
  onCasLogin,
}: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Autenticacion requerida</DialogTitle>
          <DialogDescription>
            {reason ??
              "Puedes ver el contenido sin iniciar sesion. Para guardar o descargar, debes autenticarte."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-start">
          <Button onClick={onGoogleLogin} className="w-full sm:w-auto">
            Continuar con Google
          </Button>
          <Button onClick={onCasLogin} variant="outline" className="w-full sm:w-auto">
            Continuar con CAS-UCI
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
