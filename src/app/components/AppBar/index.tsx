'use client';

import Image from 'next/image';
import * as S from './style';
import { IconButton } from '../IconButton';

export function AppBar({ title, onClose }: { title?: string; onClose?: () => void }) {
  return (
    <S.Header>
      <S.Left />
      <S.Center>{title}</S.Center>
      <S.Right>{onClose && <CloseButton onClose={onClose} />}</S.Right>
    </S.Header>
  );
}

function CloseButton({ onClose }: { onClose?: () => void }) {
  return (
    <IconButton onClick={onClose}>
      <Image src="/svgs/clear.svg" alt="닫기" width={24} height={24} />
    </IconButton>
  );
}
