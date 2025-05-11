import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mitsukabose - 味噌ラーメン専門店",
  description: "大阪・千里中央の味噌ラーメン専門店「Mitsukabose」の公式サイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8 lg:ml-60">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
