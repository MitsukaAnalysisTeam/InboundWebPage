import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Providers from '@/components/Providers';
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (params.lang === 'en') {
    return {
      title: 'Mitsukabose Miso Ramen | Authentic Ramen in Osaka, Japan',
      description: 'Specialty Miso Ramen restaurant near Osaka Itami Airport (ITM). We offer authentic Japanese ramen, including delicious vegan and vegetarian options. A must-visit ramen spot in Hotarugaike, Osaka.',
      viewport: 'width=device-width, initial-scale=1',
    };
  }
  return {
    title: '発酵と味噌ラーメン みつか坊主 | 大阪・蛍池のラーメン店',
    description: '大阪空港近く、蛍池駅徒歩1分。自家製味噌と発酵の技術を活かしたこだわりの味噌ラーメンをご提供。ビーガン、ベジタリアン向けメニューもございます。',
    viewport: 'width=device-width, initial-scale=1',
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang === 'en' ? 'en' : 'ja';

  const origin = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://mitsukabose.jp') : 'https://mitsukabose.jp';
  const altJa = `${origin}/ja`;
  const altEn = `${origin}/en`;

  return (
    <html lang={lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" href={altJa} hrefLang="ja" />
        <link rel="alternate" href={altEn} hrefLang="en" />
        <link rel="alternate" href={lang === 'ja' ? altJa : altEn} hrefLang="x-default" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}


