'use client';

import { ReactNode } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { SidebarProvider } from '@/contexts/use-sidebar';
import Sidebar from '@/components/Sidebar';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ParallaxProvider>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 w-full transition-all duration-300">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ParallaxProvider>
  );
} 