import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DarkModeScript } from '@/src/core/ui/components/theme-toggle'
import { ThemeProvider } from '@/src/core/ui/components/theme-provider'
import { AppShell } from '@/src/core/ui/components/app-shell'
import { getCurrentSessionAction } from '@/src/features/auth/presentation/states/auth.actions'
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

  return (
    // Use `en` for the html lang here to match the admin UI rendering and avoid
    // hydration mismatches caused by different locale strings between server and client.
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <DarkModeScript />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppShell sessionUser={sessionUser}>{children}</AppShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
