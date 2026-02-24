import type React from "react"
import type { Metadata } from "next"
import { Golos_Text, Inter, Playfair_Display, Manrope, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const golosText = Golos_Text({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair"
})
const manrope = Manrope({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope"
})
const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono"
})

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        {/* Font styling applied here to avoid hydration mismatch */}
        <div className={`${golosText.className} ${playfairDisplay.variable} ${manrope.variable} ${spaceMono.variable}`} style={{ '--font-inter': inter.style.fontFamily } as React.CSSProperties}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
