export type ListResponse = {
  id: number;
  subtitle: string;
  startDatetime: string;
}[];

export type DetailResponse = ListResponse[number] & {
  content: {
    tts: string;
    words: string[];
    answerKr: string;
    distractors: string[];
  }[];
};

// 기본 URL을 환경 변수에서 가져오거나 기본값 사용
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://front-assignment-api.vercel.app';
const endpointUrl = `${baseUrl}/api`;

export const listUrl = `${endpointUrl}/test/list`;

export function getDetailUrl(id: number) {
  return `${endpointUrl}/test/${id}`;
}
