"use client"

import Link from "next/link"
import { useSidebar } from "@/contexts/use-sidebar"

export default function Header() {
  const { toggle: toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* サイドバートグルボタン */}
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
            aria-label="サイドバーを切り替える"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* ロゴ - BOSEを中心に配置 */}
          <Link href="/" className="flex flex-col items-center">
            <div className="text-xl font-bold transition-colors tracking-wider text-center">
              <div>
                <span className="text-[#F7941D]">MI</span>
                <span className="text-black">T</span>
                <span className="text-[#F7941D]">SU</span>
                <span className="text-black">KA</span>
              </div>
              <div className="text-center">
                <span className="text-black">B</span>
                <span className="text-[#F7941D]">O</span>
                <span className="text-black">SE</span>
              </div>
            </div>
          </Link>

          {/* 右側のスペース */}
          <div className="w-10"></div>
        </div>
      </div>
    </header>
  )
}
