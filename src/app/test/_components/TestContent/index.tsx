'use client';

import React, { useCallback } from 'react';
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
import { useTestProgress } from '@/app/test/_hooks/useTestProgress';
import { useTestSubmission } from '@/app/test/_hooks/useTestSubmission';
import { useTestCountdown } from '@/app/test/_hooks/useTestCountdown';
import { useTestLeaveDetection } from '@/app/test/_hooks/useTestLeaveDetection';
import { usePlayAudio } from '@/app/test/_hooks/usePlayAudio';

interface TestContentProps {
  testId: number;
  initialTestData: DetailResponse;
  initialProblemIndex?: number | null;
}

export default function TestContent({
  testId,
  initialTestData,
  initialProblemIndex,
}: TestContentProps) {
  // 테스트 진행 상태 관리
  const { currentProblemIndex, selectedWords, setSelectedWords, currentProblem, exampleWords } =
    useTestProgress({
      testId,
      initialTestData,
      initialProblemIndex,
    });

  // 문제 제출 처리
  const { handleSubmit } = useTestSubmission({
    currentProblem,
    currentProblemIndex,
    selectedWords,
    testId,
  });

  // 카운트다운 모달 및 문제 타이머 관리
  const { showCountdownModal, countdownValue, timeLeft, testStarted } = useTestCountdown({
    testId,
    currentProblemIndex,
    initialProblemIndex,
    onTimeUp: handleSubmit, // 시간이 종료되면 자동 제출
  });

  // 오디오 재생 관리
  const { isPlayingAudio, handleHintClick } = usePlayAudio({
    currentProblem,
  });

  // 사용자 이탈 감지
  useTestLeaveDetection({
    testId,
    testStarted,
    currentProblemIndex,
  });

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
    [isPlayingAudio, setSelectedWords],
  );

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
