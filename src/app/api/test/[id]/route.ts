import { NextResponse } from 'next/server';
import { getDetailUrl } from '@/app/helpers/endpoint';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    const response = await fetch(getDetailUrl(id));

    if (!response.ok) {
      return NextResponse.json(
        { error: '테스트 데이터를 불러오는데 실패했습니다.' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching test detail for ID ${id}:`, error);
    return NextResponse.json(
      { error: '테스트 데이터를 불러오는데 문제가 발생했습니다.' },
      { status: 500 },
    );
  }
}
