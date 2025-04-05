import { NextResponse } from 'next/server';
import { listUrl } from '@/app/helpers/endpoint';

export async function GET() {
  try {
    const response = await fetch(listUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: '테스트 목록을 불러오는데 실패했습니다.' },
        { status: response.status },
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching test list:', error);
    return NextResponse.json(
      { error: '테스트 목록을 불러오는데 문제가 발생했습니다.' },
      { status: 500 },
    );
  }
}
