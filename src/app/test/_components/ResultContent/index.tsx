'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, ErrorContainer, ErrorText } from './style';

import { DetailResponse } from '@/app/helpers/endpoint';
import { Button } from '@/app/components/Button';
import ResultView from '@/app/test/_components/ResultView';

interface ResultContentProps {
  testId: number;
  initialTestData: DetailResponse;
  problemIndex: number;
  nextIndex: number;
}

function ResultDataFetcher({
  testId,
  initialTestData,
  problemIndex,
  onDataLoaded,
  onError,
}: Omit<ResultContentProps, 'nextIndex'> & {
  onDataLoaded: (isCorrect: boolean) => void;
  onError: (message: string) => void;
}) {
  useEffect(() => {
    if (!initialTestData?.content?.[problemIndex]) {
      onError('문제 데이터를 찾을 수 없습니다.');
      return;
    }

    try {
      const storageKey = `test_progress_${testId}`;
      const savedProgress = localStorage.getItem(storageKey);

      if (!savedProgress) {
        onDataLoaded(false);
        return;
      }

      const progressData = JSON.parse(savedProgress);

      if (!progressData.answers || !progressData.answers[problemIndex]) {
        onDataLoaded(false);
        return;
      }

      onDataLoaded(progressData.answers[problemIndex].isCorrect);
    } catch (err) {
      console.error('Error loading result:', err);
      onDataLoaded(false);
    }
  }, [testId, problemIndex, initialTestData, onDataLoaded, onError]);

  return null;
}

export default function ResultContent(props: ResultContentProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
          <Button onClick={() => router.push('/')}>목록으로 돌아가기</Button>
        </ErrorContainer>
      </Container>
    );
  }

  if (isCorrect === null) {
    return (
      <>
        <ResultDataFetcher
          testId={props.testId}
          initialTestData={props.initialTestData}
          problemIndex={props.problemIndex}
          onDataLoaded={setIsCorrect}
          onError={setError}
        />
      </>
    );
  }

  return <ResultView {...props} isCorrect={isCorrect} />;
}
