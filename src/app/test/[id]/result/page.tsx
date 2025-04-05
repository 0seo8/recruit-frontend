import { DetailResponse } from '@/app/helpers/endpoint';
import ResultContent from '@/app/test/_components/ResultContent';

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

export default async function ProblemResultPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { problem?: string; next?: string };
}) {
  const { id } = params;
  const { problem, next } = searchParams;

  const testId = parseInt(id, 10);
  const problemIndex = problem ? parseInt(problem, 10) : 0;
  const nextIndex = next ? parseInt(next, 10) : problemIndex + 1;

  const testData = await getTestData(testId);

  return (
    <ResultContent
      testId={testId}
      initialTestData={testData}
      problemIndex={problemIndex}
      nextIndex={nextIndex}
    />
  );
}
