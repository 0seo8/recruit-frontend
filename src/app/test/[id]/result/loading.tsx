'use client';

import styled, { keyframes } from 'styled-components';

export default function Loading() {
  return (
    <Container>
      {/* 결과 헤더 스켈레톤 */}
      <HeaderSkeleton>
        <TitleSkeleton />
      </HeaderSkeleton>

      {/* 결과 콘텐츠 스켈레톤 */}
      <ContentContainer>
        <ResultStatusSkeleton />

        {/* 정답 영역 스켈레톤 */}
        <AnswerAreaSkeleton>
          <AnswerLabelSkeleton />
          <AnswerContentSkeleton />
        </AnswerAreaSkeleton>

        {/* 내 답안 영역 스켈레톤 */}
        <MyAnswerAreaSkeleton>
          <AnswerLabelSkeleton />
          <AnswerContentSkeleton />
        </MyAnswerAreaSkeleton>
      </ContentContainer>

      {/* 버튼 스켈레톤 */}
      <ButtonAreaSkeleton>
        <ButtonSkeleton />
      </ButtonAreaSkeleton>
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
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
`;

const TitleSkeleton = styled(BaseSkeleton)`
  width: 10rem;
  height: 1.5rem;
`;

// 컨텐츠 영역
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
`;

const ResultStatusSkeleton = styled(BaseSkeleton)`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  max-width: 15rem;
`;

// 답안 영역 공통 스타일
const AnswerAreaBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AnswerAreaSkeleton = styled(AnswerAreaBase)`
  margin-bottom: 1rem;
`;

const MyAnswerAreaSkeleton = styled(AnswerAreaBase)`
  margin-bottom: 1.5rem;
`;

const AnswerLabelSkeleton = styled(BaseSkeleton)`
  width: 6rem;
  height: 1.25rem;
`;

const AnswerContentSkeleton = styled(BaseSkeleton)`
  width: 100%;
  height: 4rem;
  border-radius: 0.5rem;
`;

// 버튼 영역
const ButtonAreaSkeleton = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
`;

const ButtonSkeleton = styled(BaseSkeleton)`
  width: 100%;
  max-width: 20rem;
  height: 3rem;
  border-radius: 0.75rem;
`;
