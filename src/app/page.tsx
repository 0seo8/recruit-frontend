import { Suspense } from 'react';
import HomeContent from '@/app/components/HomeContent';
import LoadingState from '@/app/components/LoadingState';
import { ListResponse } from '@/app/helpers/endpoint';

async function getTests(): Promise<{ data: ListResponse }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/test/list`);

    if (!response.ok) {
      throw new Error(`테스트 목록을 가져오지 못했습니다 (${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('테스트 목록 불러오기 오류:', error);
    throw error;
  }
}

export default async function Home() {
  const data = await getTests();

  const tests = Array.isArray(data.data) ? data.data : [];

  return (
    <Suspense fallback={<LoadingState />}>
      <HomeContent tests={tests} />
    </Suspense>
  );
}
