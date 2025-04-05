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

  // 로컬 스토리지 처리 및 초기 상태 설정
  useEffect(() => {
    const savedProgress = localStorage.getItem(getLocalStorageKey(testId));
    const parsedData = savedProgress ? JSON.parse(savedProgress) : { currentIndex: 0, answers: [] };

    // URL에서 받은 인덱스가 있으면 우선 사용
    if (initialProblemIndex !== null && initialProblemIndex !== undefined) {
      parsedData.currentIndex = initialProblemIndex;
      localStorage.setItem(getLocalStorageKey(testId), JSON.stringify(parsedData));
    }

    // 이미 모든 문제를 풀었다면 결과 페이지로 이동
    if (parsedData.currentIndex >= initialTestData.content.length) {
      router.push(`/test/result/${testId}`);
      return;
    }

    setCurrentProblemIndex(parsedData.currentIndex);
    setTimeLeft(45);

    // 카운트다운 모달 표시 여부 결정
    if (parsedData.currentIndex === 0 || !parsedData.answers[parsedData.currentIndex - 1]) {
      setShowCountdownModal(true);
      setTestStarted(false);
    } else {
      setShowCountdownModal(false);
      setTestStarted(true);
    }

    // 단어 선택 초기화
    setSelectedWords([]);
  }, [testId, initialTestData.content.length, router, initialProblemIndex]);

  // 현재 문제
  const currentProblem = useMemo(() => {
    return initialTestData.content[currentProblemIndex];
  }, [initialTestData, currentProblemIndex]);

  // useMemo를 사용하여 보기 단어 목록이 문제가 바뀔 때만 섞이도록 함
  const exampleWords = useMemo(() => {
    return [...currentProblem.words, ...currentProblem.distractors].sort(() => Math.random() - 0.5);
  }, [currentProblem]);

  // 카운트다운 모달 타이머
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

  // 문제 타이머
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

  // 사용자 이탈 감지
  useEffect(() => {
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
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testStarted, currentProblemIndex, testId]);

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
