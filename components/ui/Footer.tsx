import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { HiGlobeAlt } from 'react-icons/hi';

export function Footer() {
  return (
    <footer className="bg-[#2A2B2A] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-light mb-2">発酵と味噌ラーメン みつか坊主</h3>
            <p className="text-sm text-gray-300">
              〒560-0032 大阪府豊中市螢池東町１丁目６−５ 空港センタービル ２階
            </p> {/* :contentReference[oaicite:0]{index=0} */}
            <p className="text-sm text-gray-300">
              Tel: 06-6850-3532
            </p> {/* :contentReference[oaicite:1]{index=1} */}
          </div>
          
          <div className="flex space-x-6">
            <Link
              href="https://www.instagram.com/mitsukabose.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E07A5F] transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" />
            </Link> {/* :contentReference[oaicite:2]{index=2} */}
            
            <Link
              href="https://mitsukabose.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E07A5F] transition-colors"
            >
              <span className="sr-only">Official Website</span>
              <HiGlobeAlt className="h-6 w-6" />
            </Link> {/* :contentReference[oaicite:3]{index=3} */}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Mitsukabōzu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
