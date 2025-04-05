import { NextResponse } from 'next/server';
import { getDetailUrl } from '@/app/helpers/endpoint';

export async function GET(request, context) {
  const id = Number(context.params.id);

  try {
    const response = await fetch(getDetailUrl(id), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: '테스트 데이터를 불러오는데 실패했습니다.' },
        { status: response.status },
      );
    }

    const data = await response.json();

    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');

    return NextResponse.json(data, {
      headers,
    });
  } catch (error) {
    console.error(`Error fetching test detail for ID ${id}:`, error);
    return NextResponse.json(
      { error: '테스트 데이터를 불러오는데 문제가 발생했습니다.' },
      { status: 500 },
    );
  }
}
