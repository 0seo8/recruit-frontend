'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@/app/components/Button';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    // 에러를 로깅 (클라이언트 측에서만 실행)
    console.error('테스트 페이지 에러 발생:', error);
  }, [error]);

  // 다시 시도하기
  const handleRetry = () => {
    try {
      reset();
    } catch (e) {
      console.error('Reset 함수 실행 중 오류:', e);
      window.location.reload();
    }
  };

  // 홈으로 돌아가기
  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Container>
      <ErrorContent>
        <ErrorTitle>문제가 발생했습니다</ErrorTitle>
        <ErrorMessage>{error.message || '테스트를 불러오는 중 문제가 발생했습니다.'}</ErrorMessage>
        <ErrorHint>
          서버에서 일시적인 오류가 발생했습니다.
          <br />
          다시 시도하거나 메인 페이지로 이동해 주세요.
        </ErrorHint>
        <ButtonsContainer>
          <Button onClick={handleRetry}>다시 시도</Button>
          <HomeButton onClick={handleGoHome}>홈으로 이동</HomeButton>
        </ButtonsContainer>
      </ErrorContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 3.5rem);
  padding: 1rem;
`;

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  max-width: 25rem;
  width: 100%;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #e53935;
  margin: 0 0 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
  margin: 0 0 1rem 0;
`;

const ErrorHint = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  color: #999;
  margin: 0 0 1.5rem 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const HomeButton = styled(Button)`
  background: #f0f0f0;
  color: #333;

  &:hover {
    background: #e0e0e0;
  }
`;
