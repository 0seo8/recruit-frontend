'use client';

import styled, { keyframes } from 'styled-components';

export default function Loading() {
  return (
    <Container>
      <MainCardSkeleton>
        <CategorySkeleton />
        <TitleSkeleton />
        <ScheduleSkeleton />
        <DescriptionSkeleton />
      </MainCardSkeleton>

      <ListContainer>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <ListItemSkeleton key={index} isLast={index === 4}>
              <ItemContentSkeleton>
                <TitleLineSkeleton />
                <DateLineSkeleton />
              </ItemContentSkeleton>
              <ArrowSkeleton />
            </ListItemSkeleton>
          ))}
      </ListContainer>
    </Container>
  );
}

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Container = styled.div`
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

const MainCardSkeleton = styled.div`
  background-color: #91e6b3;
  padding: 3.75rem 1.25rem 1.875rem;
  margin-bottom: 1rem;
  border-radius: 0;
`;

const BaseSkeleton = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 25%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.2) 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const CategorySkeleton = styled(BaseSkeleton)`
  width: 170px;
  height: 16px;
  margin-bottom: 8px;
`;

const TitleSkeleton = styled(BaseSkeleton)`
  width: 220px;
  height: 24px;
  margin-bottom: 8px;
`;

const ScheduleSkeleton = styled(BaseSkeleton)`
  width: 140px;
  height: 14px;
  margin-bottom: 12px;
`;

const DescriptionSkeleton = styled(BaseSkeleton)`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-radius: 8px;
`;

// 리스트 스켈레톤
const ListContainer = styled.div`
  background-color: white;
`;

const ListItemSkeleton = styled.div<{ isLast: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: ${props => (props.isLast ? 'none' : '1px solid #eee')};
`;

const ItemContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleLineSkeleton = styled.div`
  width: 200px;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const DateLineSkeleton = styled.div`
  width: 100px;
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ArrowSkeleton = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;
