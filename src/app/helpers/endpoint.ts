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

const endpointUrl = "https://front-assignment-api.vercel.app/api";

export const listUrl = `${endpointUrl}/test/list`;

export function getDetailUrl(id: number) {
  return `${endpointUrl}/test/${id}`;
}
