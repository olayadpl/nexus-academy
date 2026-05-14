import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DarkModeScript } from '@/src/core/ui/components/theme-toggle'
import { ThemeProvider } from '@/src/core/ui/components/theme-provider'
import { LocaleProvider } from '@/src/core/ui/components/locale-provider'
import { AppShell } from '@/src/core/ui/components/app-shell'
import { Toaster } from '@/src/core/ui/components/sonner'
import { getCurrentSessionAction } from '@/src/features/auth/presentation/states/auth.actions'
import { getUserPreferencesAction } from '@/src/features/preferences/presentation/states/preferences.actions'
import type { Locale } from '@/src/lib/i18n/translations'
import '@/src/app/(app)/globals.css'

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'CRAI - Centro de Recursos para el Aprendizaje y la Investigacion',
  description: 'Plataforma academica para estudiantes de ciencias informaticas',
  generator: 'Nexus Academy',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        rel: 'icon',
        type: 'image/x-icon',
      },
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sessionUser = await getCurrentSessionAction()
  const userId = sessionUser?.id ?? "demo-user"
  let initialLocale: Locale = "es"

  try {
    const preferences = await getUserPreferencesAction(userId)
    if (preferences?.language) {
      initialLocale = preferences.language
    }
  } catch {
    initialLocale = "es"
  }

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <DarkModeScript />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LocaleProvider initialLocale={initialLocale}>
            <AppShell sessionUser={sessionUser}>{children}</AppShell>
          </LocaleProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
