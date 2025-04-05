'use client';

import {
  AnswerArea,
  AnswerEmptyLine,
  WordChipsContainer,
  WordChip,
  SelectedWordChip,
  AnswerLinesContainer,
  SelectedWordsOverlay,
} from '@/app/test/_components/WordSelector/style';

interface WordSelectorProps {
  exampleWords: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
  isDisabled: boolean;
}

export const WordSelector = ({
  exampleWords,
  selectedWords,
  onWordClick,
  isDisabled,
}: WordSelectorProps) => {
  return (
    <>
      <AnswerArea>
        <AnswerLinesContainer>
          <SelectedWordsOverlay>
            {selectedWords.map((word, index) => (
              <SelectedWordChip key={index} disabled={isDisabled} onClick={() => onWordClick(word)}>
                {word}
              </SelectedWordChip>
            ))}
          </SelectedWordsOverlay>
          <AnswerEmptyLine />
          <AnswerEmptyLine />
          <AnswerEmptyLine />
          <AnswerEmptyLine />
        </AnswerLinesContainer>
      </AnswerArea>

      <WordChipsContainer>
        {exampleWords.map((word, index) => (
          <WordChip
            key={index}
            onClick={() => onWordClick(word)}
            $selected={selectedWords.includes(word)}
            disabled={isDisabled}
          >
            {word}
          </WordChip>
        ))}
      </WordChipsContainer>
    </>
  );
};
