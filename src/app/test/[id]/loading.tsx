'use client';

import styled, { keyframes } from 'styled-components';

export default function Loading() {
  return (
    <Container>
      {/* 문제 헤더 스켈레톤 */}
      <HeaderSkeleton>
        <TitleSkeleton />
        <TimerSkeleton />
      </HeaderSkeleton>

      {/* 문제 콘텐츠 스켈레톤 */}
      <ContentContainer>
        <QuestionSkeleton />

        {/* 힌트 버튼 스켈레톤 */}
        <HintButtonSkeleton />

        {/* 내 답안 영역 스켈레톤 */}
        <AnswerAreaSkeleton>
          <AnswerTitleSkeleton />
          <AnswerBoxSkeleton />
        </AnswerAreaSkeleton>

        {/* 보기 영역 스켈레톤 */}
        <ExampleAreaSkeleton>
          <ExampleTitleSkeleton />
          <ExampleGridSkeleton>
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <ExampleItemSkeleton key={index} />
              ))}
          </ExampleGridSkeleton>
        </ExampleAreaSkeleton>
      </ContentContainer>
    </Container>
  );
}

// 스켈레톤 애니메이션
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Container = styled.div`
  padding: 1rem;
  max-width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: column;
`;

const BaseSkeleton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 0.25rem;
`;

// 헤더 영역 스켈레톤
const HeaderSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

const TitleSkeleton = styled(BaseSkeleton)`
  width: 8rem;
  height: 1.5rem;
`;

const TimerSkeleton = styled(BaseSkeleton)`
  width: 3rem;
  height: 1.5rem;
  border-radius: 1rem;
`;

// 컨텐츠 영역
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.5rem;
`;

const QuestionSkeleton = styled(BaseSkeleton)`
  width: 100%;
  height: 4rem;
  margin-bottom: 0.5rem;
`;

const HintButtonSkeleton = styled(BaseSkeleton)`
  width: 6rem;
  height: 2.5rem;
  align-self: center;
  border-radius: 1.25rem;
`;

// 내 답안 영역
const AnswerAreaSkeleton = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AnswerTitleSkeleton = styled(BaseSkeleton)`
  width: 6rem;
  height: 1.25rem;
`;

const AnswerBoxSkeleton = styled(BaseSkeleton)`
  width: 100%;
  height: 5rem;
  border-radius: 0.5rem;
`;

// 보기 영역
const ExampleAreaSkeleton = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExampleTitleSkeleton = styled(BaseSkeleton)`
  width: 4rem;
  height: 1.25rem;
`;

const ExampleGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const ExampleItemSkeleton = styled(BaseSkeleton)`
  height: 2.5rem;
  border-radius: 0.5rem;
`;
