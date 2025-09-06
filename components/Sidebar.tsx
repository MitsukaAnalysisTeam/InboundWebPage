"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useSidebar } from "@/contexts/use-sidebar"

const navigationItems = [
  { name: "Home", href: "/" },
  // { name: "History", href: "/history" },
  // { name: "What is Miso?", href: "/what-is-miso" },
  // { name: "Why Miso Ramen?", href: "/why-miso-ramen" },
  { name: "Food & Drinks", href: "/food-and-drinks" },
  { name: "Menu", href: "/menu" },
  { name: "Events", href: "/events" },
  // { name: "Retail", href: "/retail" },
  { name: "Access", href: "/access" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, close } = useSidebar()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        close()
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted, close])

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      close()
    }
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(href)
  }

  // サーバーサイドレンダリング時は初期状態を返す
  if (!isMounted) {
    return (
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[280px] bg-white shadow-lg transform -translate-x-full transition-transform duration-300 z-30">
        <div className="p-4 sm:p-6 h-full flex flex-col overflow-y-auto">
          <nav className="space-y-1 sm:space-y-2 flex-grow">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base text-gray-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    )
  }

  return (
    <>
      {/* オーバーレイ - モバイル表示時のみ */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={close} aria-hidden="true" />
      )}

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-[280px] bg-white shadow-lg transform transition-transform duration-300 z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col overflow-y-auto">
          <nav className="space-y-1 sm:space-y-2 flex-grow">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`
                  block px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors text-sm sm:text-base
                  ${
                    isActive(item.href)
                      ? "bg-gray-100 text-[#2B2B2B] font-medium border-l-4 border-[#2B2B2B]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#2B2B2B]"
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500
                  after:transition-all after:duration-400 after:ease-in-out
                  hover:after:w-full
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
