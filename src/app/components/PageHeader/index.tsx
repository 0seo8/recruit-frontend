'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AppBar } from '@/app/components/AppBar';

export default function PageHeader() {
  const pathname = usePathname();
  const router = useRouter();

  let title = '테스트 목록';
  let handleClose;

  if (pathname.includes('/test/result/')) {
    title = '테스트 결과';
    handleClose = () => router.push('/');
  } else if (pathname.includes('/test/')) {
    title = '테스트';
    handleClose = () => {
      router.push('/');
    };
  }

  return <AppBar title={title} onClose={handleClose} />;
}
