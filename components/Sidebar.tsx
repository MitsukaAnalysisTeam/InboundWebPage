'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'History', href: '/history' },
  { name: 'What is Miso?', href: '/what-is-miso' },
  { name: 'Why Miso Ramen?', href: '/why-miso-ramen' },
  { name: 'Food & Drinks', href: '/food-and-drinks' },
  { name: 'Menu', href: '/menu' },
  { name: 'Retail', href: '/retail' },
  { name: 'Access', href: '/access' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* モバイル用ハンバーガーメニューボタン */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md lg:hidden bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="メニューを開く"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* サイドバー */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6">
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-[#2B2B2B]">
              Mitsukabose
            </Link>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-md transition-colors
                    ${isActive
                      ? 'bg-gray-100 text-[#2B2B2B] font-medium border-l-4 border-[#2B2B2B]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#2B2B2B]'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* モバイル時のオーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 