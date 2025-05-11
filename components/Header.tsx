'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* ロゴ */}
          <Link href="/" className="flex items-center ml-auto">
            <span className="text-xl font-bold text-[#2B2B2B] hover:text-gray-700 transition-colors">
              Mitsukabose
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
} 