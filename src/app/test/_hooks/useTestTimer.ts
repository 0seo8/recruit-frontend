import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTestTimerProps {
  initialTime?: number;
  onTimeUp: () => void;
}

export const useTestTimer = ({ initialTime = 300, onTimeUp }: UseTestTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownValue, setCountdownValue] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // 페이지 이탈 시 이벤트 처리
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isTimerRunning) {
        e.preventDefault();
        e.returnValue = '테스트가 진행 중입니다. 정말 나가시겠습니까?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isTimerRunning]);

  // 카운트다운 시작
  useEffect(() => {
    if (showCountdown) {
      countdownRef.current = setInterval(() => {
        setCountdownValue(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            setShowCountdown(false);
            setIsTimerRunning(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [showCountdown]);

  // 타이머 시작
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning, onTimeUp]);

  // 타이머 일시정지
  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 타이머 재개
  const resumeTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);

  // 타이머 리셋
  const resetTimer = useCallback(() => {
    pauseTimer();
    setTimeLeft(initialTime);
    setShowCountdown(true);
    setCountdownValue(3);
  }, [initialTime, pauseTimer]);

  return {
    timeLeft,
    isTimerRunning,
    showCountdown,
    countdownValue,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
};
