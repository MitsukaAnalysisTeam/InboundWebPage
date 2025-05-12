import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { SidebarProvider } from "@/contexts/use-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mitsukabose - 味噌ラーメン専門店",
  description: "大阪・千里中央の味噌ラーメン専門店「Mitsukabose」の公式サイトです。",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SidebarProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 w-full transition-all duration-300">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
