import { Suspense } from 'react';
import { DetailResponse } from '@/app/helpers/endpoint';
import LoadingState from '@/app/components/LoadingState';
import TestResultContent from '@/app/test/_components/TestResultContent';

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

export default async function TestResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testId = parseInt(id, 10);
  const testData = await getTestData(testId);

  return (
    <Suspense fallback={<LoadingState message="결과를 불러오는 중..." />}>
      <TestResultContent testId={testId} initialTestData={testData} />
    </Suspense>
  );
}
