'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@/app/components/Button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const handleRetry = () => {
    try {
      // Next.js의 reset 함수가 있다면 먼저 시도
      if (reset && typeof reset === 'function') {
        reset();
      }
    } catch (e) {
      console.error('Reset 함수 실행 중 오류:', e);
    }

    // 그 후 페이지 자체를 새로고침 (보다 확실한 방법)
    // API 캐시를 무시하기 위해 쿼리 파라미터 추가
    const timestamp = new Date().getTime();
    window.location.href = `/?retry=${timestamp}`;
  };

  return (
    <Container>
      <ErrorContent>
        <ErrorTitle>문제가 발생했습니다</ErrorTitle>
        <ErrorMessage>
          {error.message || '테스트 목록을 불러오는 중 문제가 발생했습니다.'}
        </ErrorMessage>
        <ErrorHint>
          서버에서 일시적인 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </ErrorHint>
        <ButtonContainer>
          <Button onClick={handleRetry}>다시 시도</Button>
        </ButtonContainer>
      </ErrorContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 16px;
`;

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const ErrorTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #e53935;
  margin: 0 0 16px 0;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin: 0 0 16px 0;
`;

const ErrorHint = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #999;
  margin: 0 0 24px 0;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
`;
