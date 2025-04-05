'use client';

import {
  AnswerArea,
  AnswerEmptyLine,
  WordChipsContainer,
  WordChip,
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
              <WordChip key={index} $selected={false} disabled={true} onClick={() => {}}>
                {word}
              </WordChip>
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
            disabled={isDisabled || selectedWords.includes(word)}
          >
            {word}
          </WordChip>
        ))}
      </WordChipsContainer>
    </>
  );
};
