'use client';

import { useState, useEffect, useMemo } from 'react';
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

// 이미지 import
import resultFailImg from '@/app/assets/images/result-fail.png';
import resultPerfect1Img from '@/app/assets/images/result-perfect-1.png';
import resultPerfect2Img from '@/app/assets/images/result-perfect-2.png';
import resultPerfect3Img from '@/app/assets/images/result-perfect-3.png';
import resultGood1Img from '@/app/assets/images/result-good-1.png';
import resultGood2Img from '@/app/assets/images/result-good-2.png';
import resultGood3Img from '@/app/assets/images/result-good-3.png';

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
  const [imageLoaded, setImageLoaded] = useState(false);

  // 사전 최적화된 이미지 경로
  const allResultImages = useMemo(
    () => ({
      fail: resultFailImg,
      perfect: [resultPerfect1Img, resultPerfect2Img, resultPerfect3Img],
      good: [resultGood1Img, resultGood2Img, resultGood3Img],
    }),
    [],
  );

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
      return allResultImages.fail;
    } else if (status === 'perfect') {
      const randomIndex = Math.floor(Math.random() * allResultImages.perfect.length);
      return allResultImages.perfect[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * allResultImages.good.length);
      return allResultImages.good[randomIndex];
    }
  };

  // 결과 이미지 경로
  const resultImageSrc = useMemo(
    () => getResultImage(),
    [correctCount, initialTestData.content.length, allResultImages],
  );

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
          <Image
            src={resultImageSrc}
            alt="결과 이미지"
            width={180}
            height={180}
            priority
            onLoadingComplete={() => setImageLoaded(true)}
            quality={90}
          />
        </ResultImage>

        {/* 이미지가 로드된 후에만 콘텐츠 표시 */}
        {imageLoaded && (
          <>
            <ResultTitle>{getResultTitle()}</ResultTitle>
            <ResultText>{getResultSubtext()}</ResultText>
            {renderResultBadges()}
          </>
        )}

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
