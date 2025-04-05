'use client';

import Image from 'next/image';
import { Header, Left, Center, Right } from './style';
import { IconButton } from '../IconButton';

export function AppBar({ title, onClose }: { title?: string; onClose?: () => void }) {
  return (
    <Header>
      <Left />
      <Center>{title}</Center>
      <Right>{onClose && <CloseButton onClose={onClose} />}</Right>
    </Header>
  );
}

function CloseButton({ onClose }: { onClose?: () => void }) {
  return (
    <IconButton onClick={onClose}>
      <Image src="/svgs/clear.svg" alt="닫기" width={24} height={24} priority />
    </IconButton>
  );
}
