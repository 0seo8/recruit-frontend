'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DetailResponse } from '@/app/helpers/endpoint';
import { getLocalStorageKey } from './useTestProgress';

type ProblemType = DetailResponse['content'][0];

interface UseTestSubmissionProps {
  currentProblem: ProblemType;
  currentProblemIndex: number;
  selectedWords: string[];
  testId: number;
}

export function useTestSubmission({
  currentProblem,
  currentProblemIndex,
  selectedWords,
  testId,
}: UseTestSubmissionProps) {
  const router = useRouter();

  // 정답 검사 함수
  function isAnswerCorrect(selected: string[], answer: string[]): boolean {
    if (selected.length !== answer.length) return false;

    // 순서를 고려하지 않는 경우
    return (
      selected.every(word => answer.includes(word)) && answer.every(word => selected.includes(word))
    );
  }

  // 문제 제출 핸들러
  const handleSubmit = useCallback(() => {
    // 현재 문제의 결과 저장
    const isCorrect = isAnswerCorrect(selectedWords, currentProblem.words);

    // 로컬 스토리지에 결과 저장
    const storageKey = getLocalStorageKey(testId);
    const savedProgress = localStorage.getItem(storageKey);
    const progressData = savedProgress
      ? JSON.parse(savedProgress)
      : { currentIndex: 0, answers: [] };

    progressData.answers[currentProblemIndex] = {
      selectedWords,
      isCorrect,
    };

    // 다음 문제로 이동 또는 결과 페이지로 이동
    const nextIndex = currentProblemIndex + 1;
    progressData.currentIndex = nextIndex;

    localStorage.setItem(storageKey, JSON.stringify(progressData));

    // 결과 페이지로 이동
    router.push(`/test/${testId}/result?problem=${currentProblemIndex}&next=${nextIndex}`);
  }, [currentProblem, currentProblemIndex, selectedWords, testId, router]);

  return {
    handleSubmit,
  };
}
