'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DetailResponse } from '@/app/helpers/endpoint';
import { Button } from '@/app/components/Button';
import LoadingState from '@/app/components/LoadingState';
import { BadgeCheck } from 'lucide-react';

import {
  Container,
  ResultSection,
  ResultImage,
  ResultTitle,
  ResultText,
  ScoreDisplay,
  ScoreText,
  BadgesContainer,
  BadgeWrapper,
  ProblemTooltip,
  ButtonContainer,
  ActionButton,
  ErrorContainer,
  ErrorText,
} from './style';

interface TestResultContentProps {
  testId: number;
  initialTestData: DetailResponse;
}

interface UserAnswer {
  problemId: string;
  userAnswer: string[];
  correctAnswer: string[];
  isCorrect: boolean;
  isAbandoned: boolean;
}

export default function TestResultContent({ testId, initialTestData }: TestResultContentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storageKey = `test_progress_${testId}`;
      const savedProgress = localStorage.getItem(storageKey);

      if (!savedProgress) {
        setError('결과 데이터를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      const progressData = JSON.parse(savedProgress);

      if (!progressData.answers || !Array.isArray(progressData.answers)) {
        setError('결과 데이터 형식이 올바르지 않습니다.');
        setLoading(false);
        return;
      }

      setAnswers(progressData.answers);

      // 정답 개수 계산
      const correct = progressData.answers.filter((answer: UserAnswer) => answer.isCorrect).length;
      setCorrectCount(correct);

      setLoading(false);
    } catch (err) {
      console.error('Error loading test results:', err);
      setError('결과 데이터를 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  }, [testId]);

  const handleGoToList = () => {
    router.push('/');
  };

  const getResultStatus = () => {
    const totalProblems = initialTestData.content.length;
    const wrongCount = totalProblems - correctCount;

    if (wrongCount >= 3) return 'fail';
    if (correctCount === totalProblems) return 'perfect';
    return 'good';
  };

  const getResultImage = () => {
    const status = getResultStatus();

    if (status === 'fail') {
      return '/images/result-fail.png';
    } else if (status === 'perfect') {
      const perfectImages = [
        '/images/result-perfect-1.png',
        '/images/result-perfect-2.png',
        '/images/result-perfect-3.png',
      ];
      const randomIndex = Math.floor(Math.random() * perfectImages.length);
      return perfectImages[randomIndex];
    } else {
      const goodImages = [
        '/images/result-good-1.png',
        '/images/result-good-2.png',
        '/images/result-good-3.png',
      ];
      const randomIndex = Math.floor(Math.random() * goodImages.length);
      return goodImages[randomIndex];
    }
  };

  const getResultTitle = () => {
    const status = getResultStatus();

    if (status === 'fail') {
      return '아쉬워요...';
    } else if (status === 'perfect') {
      return '완벽, 모두 맞혔어요!';
    } else {
      return '좋아요. 잘 했어요!';
    }
  };

  const getResultSubtext = () => {
    const status = getResultStatus();

    if (status === 'fail') {
      return '다음에는 더 잘할 수 있을 거예요!';
    } else if (status === 'perfect') {
      return '모든 문제를 맞혔어요!';
    } else {
      return '몇 개의 실수가 있었지만 훌륭했어요!';
    }
  };

  const handleBadgeClick = (index: number) => {
    if (activeTooltip === index) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(index);
    }
  };

  const renderResultBadges = () => {
    const status = getResultStatus();

    return (
      <BadgesContainer>
        {answers.map((answer, index) => {
          const problemText = initialTestData.content[index].answerKr;

          if (status === 'perfect') {
            return (
              <BadgeWrapper key={index} onClick={() => handleBadgeClick(index)}>
                <BadgeCheck size={40} color="#0DB6FF" />
                {activeTooltip === index && (
                  <ProblemTooltip $show={true} $status="perfect">
                    {problemText}
                  </ProblemTooltip>
                )}
              </BadgeWrapper>
            );
          } else if (status === 'fail') {
            return (
              <BadgeWrapper key={index} onClick={() => handleBadgeClick(index)}>
                {answer.isCorrect ? (
                  <BadgeCheck size={40} color="#FF5F5F" />
                ) : (
                  <BadgeCheck size={40} color="#F3F4F6" />
                )}
                {activeTooltip === index && (
                  <ProblemTooltip $show={true} $status="fail">
                    {problemText}
                  </ProblemTooltip>
                )}
              </BadgeWrapper>
            );
          } else {
            return (
              <BadgeWrapper key={index} onClick={() => handleBadgeClick(index)}>
                {answer.isCorrect ? (
                  <BadgeCheck size={40} color="#00D6C9" />
                ) : (
                  <BadgeCheck size={40} color="#F3F4F6" />
                )}
                {activeTooltip === index && (
                  <ProblemTooltip $show={true} $status="good">
                    {problemText}
                  </ProblemTooltip>
                )}
              </BadgeWrapper>
            );
          }
        })}
      </BadgesContainer>
    );
  };

  if (loading) {
    return <LoadingState message="결과를 불러오는 중..." />;
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
          <Button onClick={handleGoToList}>목록으로 돌아가기</Button>
        </ErrorContainer>
      </Container>
    );
  }

  const resultStatus = getResultStatus();

  return (
    <Container>
      <ResultSection>
        <ResultImage>
          <Image src={getResultImage()} alt="결과 이미지" width={180} height={180} priority />
        </ResultImage>

        <ResultTitle>{getResultTitle()}</ResultTitle>
        <ResultText>{getResultSubtext()}</ResultText>

        {renderResultBadges()}

        <ScoreDisplay>
          <ScoreText $status={resultStatus}>
            {correctCount}/{initialTestData.content.length}
          </ScoreText>
        </ScoreDisplay>
      </ResultSection>

      <ButtonContainer>
        <ActionButton onClick={handleGoToList}>확인</ActionButton>
      </ButtonContainer>
    </Container>
  );
}
