'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DetailResponse } from '@/app/helpers/endpoint';

interface UseTestProgressProps {
  testId: number;
  initialTestData: DetailResponse;
  initialProblemIndex?: number | null;
}

export const getLocalStorageKey = (testId: number) => `test_progress_${testId}`;

export function useTestProgress({
  testId,
  initialTestData,
  initialProblemIndex,
}: UseTestProgressProps) {
  const router = useRouter();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(initialProblemIndex || 0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(getLocalStorageKey(testId));
    const parsedData = savedProgress ? JSON.parse(savedProgress) : { currentIndex: 0, answers: [] };

    if (initialProblemIndex !== null && initialProblemIndex !== undefined) {
      parsedData.currentIndex = initialProblemIndex;
      localStorage.setItem(getLocalStorageKey(testId), JSON.stringify(parsedData));
    }

    if (parsedData.currentIndex >= initialTestData.content.length) {
      router.push(`/test/result/${testId}`);
      return;
    }

    setCurrentProblemIndex(parsedData.currentIndex);

    setSelectedWords([]);
  }, [testId, initialTestData.content.length, router, initialProblemIndex]);

  const currentProblem = useMemo(() => {
    return initialTestData.content[currentProblemIndex];
  }, [initialTestData, currentProblemIndex]);

  const exampleWords = useMemo(() => {
    return [...currentProblem.words, ...currentProblem.distractors].sort(() => Math.random() - 0.5);
  }, [currentProblem]);

  return {
    currentProblemIndex,
    setCurrentProblemIndex,
    selectedWords,
    setSelectedWords,
    currentProblem,
    exampleWords,
  };
}
