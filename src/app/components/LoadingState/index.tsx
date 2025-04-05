'use client';

import { LoadingText } from './style';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = '테스트 목록을 불러오는 중...',
}: LoadingStateProps) {
  return <LoadingText>{message}</LoadingText>;
}
