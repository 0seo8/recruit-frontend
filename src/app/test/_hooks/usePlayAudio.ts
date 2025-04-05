'use client';

import { useState, useRef, useCallback } from 'react';
import { DetailResponse } from '@/app/helpers/endpoint';

type ProblemType = DetailResponse['content'][0];

interface UsePlayAudioProps {
  currentProblem: ProblemType;
}

export function usePlayAudio({ currentProblem }: UsePlayAudioProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleHintClick = useCallback(() => {
    if (isPlayingAudio || !currentProblem) return;

    setIsPlayingAudio(true);

    if (!audioRef.current) {
      audioRef.current = new Audio(currentProblem.tts);
    } else {
      audioRef.current.src = currentProblem.tts;
    }

    audioRef.current.play().catch(console.error);

    audioRef.current.onended = () => {
      setIsPlayingAudio(false);
    };
  }, [currentProblem, isPlayingAudio]);

  return {
    isPlayingAudio,
    handleHintClick,
  };
}
