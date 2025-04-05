'use client';

import {
  ModalOverlay,
  ModalCard,
  CircleProgressContainer,
  CircleProgressBar,
  CountdownNumber,
  ModalTitle,
  ModalSubText,
  HintInfo,
  HintLabel,
  HintText,
} from './style';

interface CountdownModalProps {
  isVisible: boolean;
  count: number;
}

export const CountdownModal = ({ isVisible, count }: CountdownModalProps) => {
  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalCard>
        <CircleProgressContainer>
          <CircleProgressBar $progress={(3 - count + 1) / 3}>
            <CountdownNumber>{count}</CountdownNumber>
          </CircleProgressBar>
        </CircleProgressContainer>
        <ModalTitle>곧 테스트가 시작됩니다!</ModalTitle>
        <ModalSubText>총 99문제가 출제됩니다.</ModalSubText>
        <ModalSubText>1문제 당 45초의 시간 제한이 있습니다.</ModalSubText>
        <HintInfo>
          <HintLabel>HINT</HintLabel>
          <HintText>정답 문장을 들어볼 수 있어요</HintText>
        </HintInfo>
      </ModalCard>
    </ModalOverlay>
  );
};
