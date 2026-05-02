import { getCurrentProfileAction } from "../states/profile.actions"

export async function ProfileScreen() {
  const profile = await getCurrentProfileAction()

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center overflow-x-hidden overflow-y-auto">
        <main className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Perfil</h1>
            <p className="mt-2 text-muted-foreground">Tu perfil y progreso de aprendizaje</p>
          </header>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Usuario: {profile.user?.name ?? "No autenticado"}</p>
            <p>Email: {profile.user?.email ?? "-"}</p>
            <p>Proveedor: {profile.user?.provider ?? "-"}</p>
            <p>Tema: {profile.preferences?.theme ?? "-"}</p>
          </div>
        </main>
      </div>
    </div>
  )
}
