import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arthur Oker - Portfolio",
  description: "Personal portfolio of Arthur Oker, CS & Philosophy Major at UVA",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Font styling applied here to avoid hydration mismatch */}
          <div className={inter.className}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}