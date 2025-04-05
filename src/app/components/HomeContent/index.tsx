'use client';

import { ListResponse } from '@/app/helpers/endpoint';
import TestList from '@/app/components/TestList';
import {
  Container,
  MainCard,
  CategoryLabel,
  MainTitle,
  ScheduleInfo,
  Description,
  EmptyText,
} from './style';

interface HomeContentProps {
  tests: ListResponse;
}

export default function HomeContent({ tests = [] }: HomeContentProps) {
  // tests가 undefined인 경우에 대한 처리
  const testItems = Array.isArray(tests) ? tests : [];

  // 첫 번째 테스트를 메인 카드로 사용
  const mainTest = testItems.length > 0 ? testItems[0] : null;

  return (
    <Container>
      {mainTest ? (
        <MainCard>
          <CategoryLabel>SPEAKING | Basic High</CategoryLabel>
          <MainTitle>LV4. 일상 영어 스킬업</MainTitle>
          <ScheduleInfo>화·목 | PM 8:30 - 9:30</ScheduleInfo>
          <Description>
            6단계 스피킹 단계 중 네 번째 레벨이에요. 다양한 일상 상황에서 긴장 하지 않고 자연스럽게
            소통하도록 연습해요.
          </Description>
        </MainCard>
      ) : null}

      {testItems.length > 0 ? (
        <TestList initialTests={testItems} />
      ) : (
        <EmptyText>이용 가능한 테스트가 없습니다.</EmptyText>
      )}
    </Container>
  );
}
