import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { StyledComponentsRegistry } from '@/app/components/StyledComponentsRegistry';
import PageHeader from '@/app/components/PageHeader';

const spoqaHanSansNeo = localFont({
  src: [
    {
      path: './assets/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './assets/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './assets/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './assets/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: '영어 테스트 앱',
  description: '유저의 영어 표현 학습을 체크하는 테스트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>
      <html lang="ko">
        <body className={spoqaHanSansNeo.className}>
          <PageHeader />
          <main>{children}</main>
        </body>
      </html>
    </StyledComponentsRegistry>
  );
}
