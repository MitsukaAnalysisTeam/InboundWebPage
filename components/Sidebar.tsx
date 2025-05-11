'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  // サーバーサイドレンダリング時は初期状態を返す
  if (!isMounted) {
    return (
      <aside className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-lg transform -translate-x-full lg:translate-x-0">
        <div className="p-4 sm:p-6 h-full flex flex-col">
          <div className="mb-6 sm:mb-8">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-[#2B2B2B]">
              Mitsukabose
            </Link>
          </div>
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
    );
  }

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md lg:hidden bg-white shadow-md hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
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

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col">
          <div className="mb-6 sm:mb-8">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-bold text-[#2B2B2B] hover:text-gray-700 transition-colors"
              onClick={handleLinkClick}
            >
              Mitsukabose
            </Link>
          </div>

          <nav className="space-y-1 sm:space-y-2 flex-grow">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`block px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors text-sm sm:text-base
                  ${isActive(item.href)
                    ? 'bg-gray-100 text-[#2B2B2B] font-medium border-l-4 border-[#2B2B2B]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#2B2B2B]'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
} 