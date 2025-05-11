import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Mitsukabose
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#what-is-miso" className="text-gray-600 hover:text-primary">
              What is Miso
            </Link>
            <Link href="#why-miso-ramen" className="text-gray-600 hover:text-primary">
              Why Miso Ramen
            </Link>
            <Link href="#menu" className="text-gray-600 hover:text-primary">
              Menu
            </Link>
            <Link href="#retail" className="text-gray-600 hover:text-primary">
              Retail
            </Link>
            <Link href="#access" className="text-gray-600 hover:text-primary">
              Access
            </Link>
          </div>

          <button className="md:hidden">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
} 