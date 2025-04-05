'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalStorageKey } from './useTestProgress';

interface UseTestLeaveDetectionProps {
  testId: number;
  testStarted: boolean;
  currentProblemIndex: number;
}

export function useTestLeaveDetection({
  testId,
  testStarted,
  currentProblemIndex,
}: UseTestLeaveDetectionProps) {
  const router = useRouter();
  const storageKey = getLocalStorageKey(testId);
  const activeKey = `${storageKey}_active`;

  // 사용자 이탈 감지
  useEffect(() => {
    if (testStarted) {
      localStorage.setItem(
        activeKey,
        JSON.stringify({
          problemIndex: currentProblemIndex,
          timestamp: Date.now(),
        }),
      );
    }

    const handleBeforeUnload = () => {
      // 테스트가 시작되었다면 현재 문제를 오답으로 처리
      if (testStarted) {
        const savedProgress = localStorage.getItem(storageKey);
        const progressData = savedProgress
          ? JSON.parse(savedProgress)
          : { currentIndex: 0, answers: [] };

        progressData.answers[currentProblemIndex] = {
          selectedWords: [],
          isCorrect: false,
        };

        progressData.currentIndex = currentProblemIndex + 1;

        localStorage.setItem(storageKey, JSON.stringify(progressData));

        // 활성 상태 제거
        localStorage.removeItem(activeKey);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 컴포넌트 언마운트 시에도 이탈 처리 (리액트 라우팅으로 페이지 변경 시)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      // 컴포넌트 언마운트로 인한 이탈 시에도 오답 처리
      if (testStarted) {
        handleBeforeUnload();
      }
    };
  }, [testStarted, currentProblemIndex, storageKey, activeKey]);

  // 재진입 감지 및 이탈 처리 확인
  useEffect(() => {
    // 이전 활성 상태 확인
    const previousActive = localStorage.getItem(activeKey);

    if (previousActive) {
      try {
        const activeData = JSON.parse(previousActive);
        const { problemIndex, timestamp } = activeData;

        const isExpired = Date.now() - timestamp > 5 * 60 * 1000;
        const isDifferentProblem = problemIndex !== currentProblemIndex;

        if (isExpired || isDifferentProblem) {
          const savedProgress = localStorage.getItem(storageKey);
          const progressData = savedProgress
            ? JSON.parse(savedProgress)
            : { currentIndex: 0, answers: [] };

          progressData.answers[problemIndex] = {
            selectedWords: [],
            isCorrect: false,
          };

          const nextIndex = problemIndex + 1;
          if (nextIndex > currentProblemIndex) {
            progressData.currentIndex = nextIndex;
            localStorage.setItem(storageKey, JSON.stringify(progressData));

            router.push(`/test/${testId}?next=${nextIndex}`);
            return;
          } else {
            progressData.currentIndex = currentProblemIndex;
            localStorage.setItem(storageKey, JSON.stringify(progressData));
          }
        }
      } catch (e) {
        console.error('이전 활성 상태 파싱 오류:', e);
      }
    }
  }, [testStarted, currentProblemIndex, testId, router, storageKey, activeKey]);
}
