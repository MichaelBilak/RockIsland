'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { SiteNav } from '@/components/layout/SiteNav';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { SplashScreen } from '@/components/ui/SplashScreen';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const navVariant = pathname === '/' ? 'overlay' : 'solid';
  const mainPad = pathname === '/' ? '' : 'pt-[72px]';

  return (
    <>
      <SplashScreen />
      <SiteNav variant={navVariant} />
      <div className={mainPad}>{children}</div>
      <MobileBottomBar />
    </>
  );
}
