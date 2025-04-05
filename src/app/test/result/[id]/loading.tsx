'use client';

import styled, { keyframes } from 'styled-components';

export default function Loading() {
  return (
    <Container>
      {/* 결과 섹션 스켈레톤 */}
      <ResultSection>
        <ResultImageSkeleton />
        <ResultTitleSkeleton />
        <ResultTextSkeleton />

        {/* 점수 영역 스켈레톤 */}
        <ScoreDisplaySkeleton>
          <ScoreTextSkeleton />
        </ScoreDisplaySkeleton>

        {/* 뱃지 영역 스켈레톤 */}
        <BadgesContainerSkeleton>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <BadgeSkeleton key={index} />
            ))}
        </BadgesContainerSkeleton>
      </ResultSection>

      {/* 버튼 영역 스켈레톤 */}
      <ButtonContainer>
        <ButtonSkeleton />
      </ButtonContainer>
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
  height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 5rem;
  margin-top: 1.5rem;
`;

const BaseSkeleton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 0.25rem;
`;

const ResultImageSkeleton = styled(BaseSkeleton)`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
`;

const ResultTitleSkeleton = styled(BaseSkeleton)`
  width: 12rem;
  height: 1.25rem;
  margin-bottom: 0.75rem;
`;

const ResultTextSkeleton = styled(BaseSkeleton)`
  width: 15rem;
  height: 1.25rem;
  margin-bottom: 2rem;
`;

const ScoreDisplaySkeleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const ScoreTextSkeleton = styled(BaseSkeleton)`
  width: 8rem;
  height: 2.5rem;
  border-radius: 0.5rem;
`;

const BadgesContainerSkeleton = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BadgeSkeleton = styled(BaseSkeleton)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.05);
`;

const ButtonSkeleton = styled(BaseSkeleton)`
  width: 100%;
  max-width: 25rem;
  height: 3rem;
  border-radius: 0.75rem;
  margin: 0 auto;
`;
