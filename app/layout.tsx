import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
 

const geistSans = GeistSans
const geistMono = GeistMono

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
})

 

export const metadata: Metadata = {
  title: {
    template: "%s | Larsen Weigle",
    default: "Larsen Weigle",
  },
  description:
    "Data scientist and software engineer specializing in conversational AI and LLM-powered applications. Stanford CS graduate building intelligent systems at the intersection of research and production.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(geistSans.variable, geistMono.variable, instrumentSerif.variable)}>
        {children}
      </body>
    </html>
  )
}