'use client';

import { useState, useEffect } from 'react';
import { getLocalStorageKey } from './useTestProgress';

interface UseTestCountdownProps {
  testId: number;
  currentProblemIndex: number;
  initialProblemIndex?: number | null;
  onTimeUp?: () => void;
}

export function useTestCountdown({
  testId,
  currentProblemIndex,
  initialProblemIndex,
  onTimeUp,
}: UseTestCountdownProps) {
  const [showCountdownModal, setShowCountdownModal] = useState(true);
  const [countdownValue, setCountdownValue] = useState(3);
  const [timeLeft, setTimeLeft] = useState(45);
  const [testStarted, setTestStarted] = useState(false);

  // 카운트다운 모달 표시 여부 결정
  useEffect(() => {
    const savedProgress = localStorage.getItem(getLocalStorageKey(testId));
    const parsedData = savedProgress ? JSON.parse(savedProgress) : { currentIndex: 0, answers: [] };

    setTimeLeft(45);

    if (parsedData.currentIndex === 0 || !parsedData.answers[parsedData.currentIndex - 1]) {
      setShowCountdownModal(true);
      setTestStarted(false);
    } else {
      setShowCountdownModal(false);
      setTestStarted(true);
    }
  }, [testId, currentProblemIndex, initialProblemIndex]);

  useEffect(() => {
    if (!showCountdownModal) return;

    const timer = setInterval(() => {
      setCountdownValue(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCountdownModal(false);
          setTestStarted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdownModal]);

  useEffect(() => {
    if (!testStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) {
            onTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, onTimeUp]);

  return {
    showCountdownModal,
    countdownValue,
    timeLeft,
    testStarted,
    setTestStarted,
  };
}
