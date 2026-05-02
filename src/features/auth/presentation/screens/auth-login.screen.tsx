"use client"

import type React from "react"
import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { Input } from "@/src/core/ui/components/input"
import { Label } from "@/src/core/ui/components/label"
import { loginAction, signupAction } from "../states/auth.actions"

type AuthScreenMode = "login" | "signup"

interface AuthLoginScreenProps {
  mode?: AuthScreenMode
}

export function AuthLoginScreen({ mode = "login" }: AuthLoginScreenProps) {
  const isSignup = mode === "signup"
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError("")

    startTransition(async () => {
      try {
        if (isSignup) {
          await signupAction({ name, email, password })
        } else {
          await loginAction({ email, password })
        }
        router.push("/explore")
        router.refresh()
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : "Error de autenticacion"
        setError(message)
      }
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">{isSignup ? "Crear cuenta" : "Iniciar sesion"}</CardTitle>
          <CardDescription>
            {isSignup ? "Comienza tu viaje de aprendizaje" : "Accede a tu cuenta de aprendizaje"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error ? <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div> : null}

            {isSignup ? (
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contrasena</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isSignup ? "Crear cuenta" : "Iniciar sesion"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {isSignup ? "Ya tienes cuenta?" : "No tienes cuenta?"}{" "}
              <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-primary hover:text-primary/80">
                {isSignup ? "Inicia sesion" : "Registrate"}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
