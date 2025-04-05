'use client';

import { usePathname } from 'next/navigation';
import { AppBar } from '@/app/components/AppBar';

export default function PageHeader() {
  const pathname = usePathname();

  // 경로에 따른 타이틀 결정
  let title = '테스트 목록';

  if (pathname.includes('/test/result/')) {
    title = '테스트 결과';
  } else if (pathname.includes('/test/')) {
    title = '테스트';
  }

  return <AppBar title={title} />;
}
