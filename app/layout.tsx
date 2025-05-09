import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HamburgerMenu } from "@/components/HamburgerMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mitsukabose - Miso Ramen Restaurant",
  description: "Welcome to Mitsukabose, a traditional miso ramen restaurant in Toyonaka, Osaka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F5F1E6]`}>
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#2B2B2B]">Mitsukabose</h1>
              <HamburgerMenu />
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-white mt-12 py-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2024 Mitsukabose. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
