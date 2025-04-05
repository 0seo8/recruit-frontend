'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { DetailResponse } from '@/app/helpers/endpoint';
import { CountdownModal } from '@/app/test/_components/CountdownModal';
import {
  Container,
  HintButton,
  BottomControls,
  TimeLeftContainer,
  TimeLeftLabel,
  TimeLeftValue,
  SubmitButtonContainer,
  SubmitButton,
  TestHeader,
  ProgressBar,
  ProgressItem,
  ProgressText,
  ProblemTitle,
} from './style';
import { Volume2 } from 'lucide-react';
import { WordSelector } from '@/app/test/_components/WordSelector';
import { useRouter } from 'next/navigation';

interface TestContentProps {
  testId: number;
  initialTestData: DetailResponse;
  initialProblemIndex?: number | null;
}

const getLocalStorageKey = (testId: number) => `test_progress_${testId}`;

export default function TestContent({
  testId,
  initialTestData,
  initialProblemIndex,
}: TestContentProps) {
  const router = useRouter();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(initialProblemIndex || 0);
  const [showCountdownModal, setShowCountdownModal] = useState(true);
  const [countdownValue, setCountdownValue] = useState(3);
  const [timeLeft, setTimeLeft] = useState(45);
  const [testStarted, setTestStarted] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    setTimeLeft(45);

    if (parsedData.currentIndex === 0 || !parsedData.answers[parsedData.currentIndex - 1]) {
      setShowCountdownModal(true);
      setTestStarted(false);
    } else {
      setShowCountdownModal(false);
      setTestStarted(true);
    }

    setSelectedWords([]);
  }, [testId, initialTestData.content.length, router, initialProblemIndex]);

  const currentProblem = useMemo(() => {
    return initialTestData.content[currentProblemIndex];
  }, [initialTestData, currentProblemIndex]);

  const exampleWords = useMemo(() => {
    return [...currentProblem.words, ...currentProblem.distractors].sort(() => Math.random() - 0.5);
  }, [currentProblem]);

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
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted]);

  // 단어 선택 핸들러
  const handleWordClick = useCallback(
    (word: string) => {
      if (isPlayingAudio) return;
      setSelectedWords(prev => {
        if (prev.includes(word)) {
          return prev.filter(w => w !== word);
        } else {
          return [...prev, word];
        }
      });
    },
    [isPlayingAudio],
  );

  // 힌트 버튼 핸들러
  const handleHintClick = useCallback(() => {
    if (isPlayingAudio || !currentProblem) return;

    setIsPlayingAudio(true);

    if (!audioRef.current) {
      audioRef.current = new Audio(currentProblem.tts);
    } else {
      audioRef.current.src = currentProblem.tts;
    }

    audioRef.current.play().catch(console.error);

    audioRef.current.onended = () => {
      setIsPlayingAudio(false);
    };
  }, [currentProblem, isPlayingAudio]);

  // 정답 검사 함수
  function isAnswerCorrect(selected: string[], answer: string[]): boolean {
    if (selected.length !== answer.length) return false;

    // 순서를 고려하지 않는 경우
    return (
      selected.every(word => answer.includes(word)) && answer.every(word => selected.includes(word))
    );
  }

  const handleSubmit = useCallback(() => {
    const isCorrect = isAnswerCorrect(selectedWords, currentProblem.words);

    const storageKey = getLocalStorageKey(testId);
    const savedProgress = localStorage.getItem(storageKey);
    const progressData = savedProgress
      ? JSON.parse(savedProgress)
      : { currentIndex: 0, answers: [] };

    progressData.answers[currentProblemIndex] = {
      selectedWords,
      isCorrect,
    };

    const nextIndex = currentProblemIndex + 1;
    progressData.currentIndex = nextIndex;

    localStorage.setItem(storageKey, JSON.stringify(progressData));

    router.push(`/test/${testId}/result?problem=${currentProblemIndex}&next=${nextIndex}`);
  }, [currentProblem, currentProblemIndex, selectedWords, testId, router]);

  // 사용자 이탈 감지
  useEffect(() => {
    // 페이지 로드 시 "활성" 상태를 로컬스토리지에 기록
    const storageKey = getLocalStorageKey(testId);
    const activeKey = `${storageKey}_active`;

    // 활성 상태 기록 및 현재 문제 인덱스 저장
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
        const storageKey = getLocalStorageKey(testId);
        const savedProgress = localStorage.getItem(storageKey);
        const progressData = savedProgress
          ? JSON.parse(savedProgress)
          : { currentIndex: 0, answers: [] };

        // 현재 문제를 오답으로 처리
        progressData.answers[currentProblemIndex] = {
          selectedWords: [],
          isCorrect: false,
        };

        // 다음 문제로 설정
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
  }, [testStarted, currentProblemIndex, testId]);

  // 재진입 감지 및 이탈 처리 확인
  useEffect(() => {
    const storageKey = getLocalStorageKey(testId);
    const activeKey = `${storageKey}_active`;

    // 이전 활성 상태 확인
    const previousActive = localStorage.getItem(activeKey);

    if (previousActive) {
      try {
        const activeData = JSON.parse(previousActive);
        const { problemIndex, timestamp } = activeData;

        // 5분 이상 지났거나, 다른 문제 인덱스라면 이탈로 간주
        const isExpired = Date.now() - timestamp > 5 * 60 * 1000;
        const isDifferentProblem = problemIndex !== currentProblemIndex;

        if (isExpired || isDifferentProblem) {
          // 이탈로 간주하고 해당 문제를 오답 처리
          const savedProgress = localStorage.getItem(storageKey);
          const progressData = savedProgress
            ? JSON.parse(savedProgress)
            : { currentIndex: 0, answers: [] };

          // 이탈한 문제를 오답 처리
          progressData.answers[problemIndex] = {
            selectedWords: [],
            isCorrect: false,
          };

          // 다음 문제로 설정 (현재 문제가 이미 다음 문제면 그대로 유지)
          const nextIndex = problemIndex + 1;
          if (nextIndex > currentProblemIndex) {
            progressData.currentIndex = nextIndex;
            localStorage.setItem(storageKey, JSON.stringify(progressData));

            // 다음 문제로 리다이렉트
            router.push(`/test/${testId}?next=${nextIndex}`);
            return;
          } else {
            // 이미 다음 문제 이후라면 현재 진행 유지
            progressData.currentIndex = currentProblemIndex;
            localStorage.setItem(storageKey, JSON.stringify(progressData));
          }
        }
      } catch (e) {
        console.error('이전 활성 상태 파싱 오류:', e);
      }
    }

    // 여기서는 활성 상태를 설정하지 않습니다 (첫 번째 useEffect에서 이미 설정)
  }, [testStarted, currentProblemIndex, testId, router]);

  // 번갈아 가며 색상 지정하는 함수
  const getProgressItemColor = (index: number) => {
    // 녹색 -> 빨강 -> 회색 순서로 번갈아가며 색상 표시
    const colorPattern = ['#59dc94', '#ff414d', '#8C8E91'];
    return colorPattern[index % 3];
  };

  return (
    <Container>
      <CountdownModal isVisible={showCountdownModal} count={countdownValue} />

      <TestHeader>
        <ProgressBar>
          {initialTestData.content.map((_, index) => {
            const isFilled = index <= currentProblemIndex;
            return (
              <ProgressItem
                key={index}
                $filled={isFilled}
                $color={isFilled ? getProgressItemColor(index) : '#646962'}
              />
            );
          })}
        </ProgressBar>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div></div>
          <ProgressText>{`${currentProblemIndex + 1}/${initialTestData.content.length}`}</ProgressText>
        </div>
      </TestHeader>

      <ProblemTitle>{currentProblem.answerKr}</ProblemTitle>

      <WordSelector
        exampleWords={exampleWords}
        selectedWords={selectedWords}
        onWordClick={handleWordClick}
        isDisabled={isPlayingAudio}
      />

      {/* 타이머 및 힌트 버튼 */}
      <HintButton onClick={handleHintClick} disabled={isPlayingAudio}>
        <Volume2 size={30} color="#ffffff" />
      </HintButton>

      <BottomControls>
        <TimeLeftContainer>
          <TimeLeftLabel>남은시간</TimeLeftLabel>
          <TimeLeftValue>{`${timeLeft}초`}</TimeLeftValue>
        </TimeLeftContainer>

        <SubmitButtonContainer>
          <SubmitButton onClick={handleSubmit}>다 풀었어요</SubmitButton>
        </SubmitButtonContainer>
      </BottomControls>
    </Container>
  );
}
