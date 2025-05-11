import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mitsukabose - 味噌ラーメン専門店",
  description:
    "大阪・千里中央の味噌ラーメン専門店「Mitsukabose」の公式サイトです。",
    viewport: "width=device-width, initial-scale=1",  // ← 追加
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
       <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-60">
            <div className="max-w-4xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
