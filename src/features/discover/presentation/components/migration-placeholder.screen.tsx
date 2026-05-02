import Link from "next/link"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/core/ui/components/card"

type MigrationPlaceholderScreenProps = {
  title: string
  description: string
}

export function MigrationPlaceholderScreen({ title, description }: MigrationPlaceholderScreenProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Esta pantalla ya existe en el enrutado actual y queda marcada para migracion funcional completa.
          </p>
          <Button asChild variant="outline">
            <Link href="/">Volver a Discover</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
