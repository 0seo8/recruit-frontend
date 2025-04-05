import { DetailResponse } from '@/app/helpers/endpoint';

export interface TestProgress {
  id: number;
  currentProblemIndex: number;
  results: Array<{
    problemId: string;
    userAnswer: string[];
    correctAnswer: string[];
    isCorrect: boolean;
    isAbandoned: boolean;
  }>;
  completed: boolean;
}

export interface TestState {
  currentProblem: {
    index: number;
    selectedWords: string[];
    exampleWords: string[];
  };
  test: DetailResponse;
}
