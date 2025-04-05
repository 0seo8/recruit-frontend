'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ListResponse } from '@/app/helpers/endpoint';
import { ListContainer, ListItem, ItemContent, Title, DateText, EmptyText } from './style';

interface TestListProps {
  initialTests: ListResponse;
}

export default function TestList({ initialTests = [] }: TestListProps) {
  const safeInitialTests = Array.isArray(initialTests) ? initialTests : [];
  const [tests] = useState<ListResponse>(safeInitialTests);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear().toString().slice(2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}. ${month}. ${day}.`;
    } catch {
      return dateString;
    }
  };

  if (tests.length === 0) {
    return <EmptyText>이용 가능한 테스트가 없습니다.</EmptyText>;
  }

  return (
    <ListContainer>
      {tests.map((test, index) => (
        <Link
          href={`/test/${test.id}`}
          key={test.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem isLast={index === tests.length - 1}>
            <ItemContent>
              <Title>{test.subtitle}</Title>
              <DateText>{formatDate(test.startDatetime)}</DateText>
            </ItemContent>
            <ChevronRight color="#45494E" />
          </ListItem>
        </Link>
      ))}
    </ListContainer>
  );
}
