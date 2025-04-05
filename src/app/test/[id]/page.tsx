import { Suspense } from 'react';
import TestContent from '@/app/test/_components/TestContent';
import LoadingState from '@/app/components/LoadingState';
import { DetailResponse } from '@/app/helpers/endpoint';

async function getTestData(id: number): Promise<DetailResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/test/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`테스트 데이터를 가져오지 못했습니다 (${response.status})`);
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('테스트 데이터 불러오기 오류:', error);
    throw error;
  }
}

export default async function TestPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const testId = Number(id);
  const testData = await getTestData(testId);

  return (
    <Suspense fallback={<LoadingState />}>
      <TestContent initialTestData={testData} testId={testId} />
    </Suspense>
  );
}
