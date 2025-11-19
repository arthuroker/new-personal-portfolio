import type React from "react"
import type { Metadata } from "next"
import { Golos_Text, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const golosText = Golos_Text({ subsets: ["latin"] })
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
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Font styling applied here to avoid hydration mismatch */}
          <div className={`${golosText.className}`} style={{ '--font-inter': inter.style.fontFamily } as React.CSSProperties}>
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}