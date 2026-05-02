import { PreferencesScreen } from "@/src/features/preferences/presentation/screens/preferences.screen"

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Configuracion y Datos de Usuario</h1>
        <p className="text-muted-foreground">Gestiona tus preferencias, marcadores, recursos guardados y mas</p>
      </div>
      <PreferencesScreen />
    </main>
  )
}
