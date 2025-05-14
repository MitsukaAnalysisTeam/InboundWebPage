'use client';
import { ReactNode } from 'react';

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
export function Tooltip({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
export function TooltipTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
export function TooltipContent({ children }: { children: ReactNode }) {
  return <div className="absolute z-50 bg-black text-white text-xs rounded px-2 py-1">{children}</div>;
}