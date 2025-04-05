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
  ResultIcon,
  ResultText,
} from './style';

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

  // 다음 문제로 이동 또는 최종 결과 페이지로 이동
  const handleNextProblem = () => {
    if (isLastProblem) {
      router.push(`/test/result/${testId}`);
    } else {
      router.push(`/test/${testId}`);
    }
  };

  return (
    <Container>
      <Header>
        <ProgressBar>
          {initialTestData.content.map((_, index) => (
            <ProgressItem
              key={index}
              $filled={index <= problemIndex}
              $color={index <= problemIndex ? '#4A90E2' : '#e0e0e0'}
            />
          ))}
        </ProgressBar>
        <ProgressText>{`${problemIndex + 1}/${initialTestData.content.length}`}</ProgressText>
      </Header>

      <ResultContainer>
        <ResultIcon>
          {isCorrect ? (
            <Image src="/images/test-success.png" alt="정답" width={160} height={160} />
          ) : (
            <Image src="/images/test-fail.png" alt="오답" width={160} height={160} />
          )}
        </ResultIcon>

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

        <ButtonContainer>
          <NextButton onClick={handleNextProblem}>
            {isLastProblem ? '결과 확인하기' : '다음 문제'}
          </NextButton>
        </ButtonContainer>
      </ResultContainer>
    </Container>
  );
}
