'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DetailResponse } from '@/app/helpers/endpoint';
import {
  ButtonContainer,
  ColoredText,
  Container,
  Header,
  NextButton,
  ProgressBar,
  ProgressItem,
  ProgressText,
  ResultContainer,
  ResultFront,
  ResultBack,
  ResultIcon,
  ResultText,
  AnswerText,
  AnswerLabel,
  AnswerContent,
} from './style';
import { useEffect, useState } from 'react';

// 이미지 import
import testSuccessImg from '@/app/assets/images/test-success.png';
import testFailImg from '@/app/assets/images/test-fail.png';

interface ResultViewProps {
  testId: number;
  initialTestData: DetailResponse;
  problemIndex: number;
  nextIndex: number;
  isCorrect: boolean;
}

export default function ResultView({
  testId,
  initialTestData,
  problemIndex,
  nextIndex,
  isCorrect,
}: ResultViewProps) {
  const router = useRouter();
  const isLastProblem = nextIndex >= initialTestData.content.length;
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 로컬 스토리지에서 풀이 결과 가져오기
  const getLocalStorageKey = (testId: number) => `test_progress_${testId}`;

  // 특정 문제의 정답 여부 확인
  const getProblemResult = (index: number) => {
    const storageKey = getLocalStorageKey(testId);
    const savedProgress = localStorage.getItem(storageKey);

    if (!savedProgress) return null;

    const progressData = JSON.parse(savedProgress);

    if (!progressData.answers || !progressData.answers[index]) {
      return null;
    }

    return progressData.answers[index].isCorrect;
  };

  // 유저 답변과 정답 불러오기
  useEffect(() => {
    const storageKey = getLocalStorageKey(testId);
    const savedProgress = localStorage.getItem(storageKey);

    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      if (progressData.answers && progressData.answers[problemIndex]) {
        setUserAnswer(progressData.answers[problemIndex].selectedWords || []);
      }
    }

    if (initialTestData.content && initialTestData.content[problemIndex]) {
      setCorrectAnswer(initialTestData.content[problemIndex].words || []);
    }
  }, [testId, problemIndex, initialTestData]);

  // 현재 문제에 대한 결과 저장
  useEffect(() => {
    const storageKey = getLocalStorageKey(testId);
    const savedProgress = localStorage.getItem(storageKey);
    const progressData = savedProgress
      ? JSON.parse(savedProgress)
      : { currentIndex: 0, answers: [] };

    // 현재 문제의 결과 저장
    progressData.answers[problemIndex] = {
      ...progressData.answers[problemIndex],
      isCorrect,
    };

    localStorage.setItem(storageKey, JSON.stringify(progressData));
  }, [testId, problemIndex, isCorrect]);

  // 다음 문제로 이동 또는 최종 결과 페이지로 이동
  const handleNextProblem = () => {
    if (isLastProblem) {
      router.push(`/test/result/${testId}`);
    } else {
      // next 파라미터를 URL에 명시적으로 포함시켜 다음 문제의 인덱스를 전달
      router.push(`/test/${testId}?next=${nextIndex}`);
    }
  };

  // 카드 클릭 시 뒤집기
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container>
      <Header>
        <ProgressBar>
          {initialTestData.content.map((_, index) => (
            <ProgressItem
              key={index}
              $filled={index <= problemIndex}
              $isCorrect={index === problemIndex ? isCorrect : getProblemResult(index)}
            />
          ))}
        </ProgressBar>
        <ProgressText>{`${problemIndex + 1}/${initialTestData.content.length}`}</ProgressText>
      </Header>

      <ResultContainer $isFlipped={isFlipped} onClick={handleCardClick}>
        <ResultFront>
          <ResultIcon>
            {isCorrect ? (
              <Image
                src={testSuccessImg}
                alt="정답"
                width={160}
                height={160}
                priority
                onLoadingComplete={() => setImagesLoaded(true)}
                quality={90}
              />
            ) : (
              <Image
                src={testFailImg}
                alt="오답"
                width={160}
                height={160}
                priority
                onLoadingComplete={() => setImagesLoaded(true)}
                quality={90}
              />
            )}
          </ResultIcon>

          {imagesLoaded && (
            <ResultText>
              {isCorrect ? (
                <>
                  <ColoredText $isCorrect={true}>정답</ColoredText>이에요!
                </>
              ) : (
                <>
                  <ColoredText $isCorrect={false}>오답</ColoredText>이에요
                </>
              )}
            </ResultText>
          )}
        </ResultFront>

        <ResultBack>
          <AnswerText>
            <AnswerLabel>정답</AnswerLabel>
            <AnswerContent $isCorrect={true}>{correctAnswer.join(' ')}</AnswerContent>
          </AnswerText>

          {!isCorrect && (
            <AnswerText>
              <AnswerLabel>내 답안</AnswerLabel>
              <AnswerContent $isCorrect={false}>{userAnswer.join(' ')}</AnswerContent>
            </AnswerText>
          )}

          <AnswerText style={{ marginTop: '2rem' }}>
            {isCorrect ? '정확하게 답변하셨어요!' : '다음에는 잘 할 수 있을 거예요!'}
          </AnswerText>
        </ResultBack>
      </ResultContainer>

      <ButtonContainer>
        <NextButton onClick={handleNextProblem}>
          {isLastProblem ? '결과 확인하기' : '다음 문제'}
        </NextButton>
      </ButtonContainer>
    </Container>
  );
}
