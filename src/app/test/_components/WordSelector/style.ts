import styled from 'styled-components';

export const SelectedWordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 1rem 0;
`;

export const SelectedWord = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333333;
  margin-right: 0.25rem;
`;

export const AnswerArea = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AnswerLinesContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SelectedWordsOverlay = styled.div`
  position: absolute;
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const AnswerEmptyLine = styled.div`
  height: 3em;
  border-bottom: 0.0625rem solid #64696e;
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

export const WordChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 1.25rem;
  background-color: #f4f5f7;
  padding: 0.75rem;
  border-radius: 0.5rem;
  height: auto;
  min-height: auto;
  max-height: none;
  overflow-y: visible;
`;

export const SelectedWordChip = styled.button<{ disabled: boolean }>`
  background-color: white;
  color: #333333;
  padding: 0.5rem 0.75rem;
  border: 0.0625rem solid #e0e0e0;
  border-radius: 0.75rem;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 3rem;
  max-width: 100%;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0.25rem;
  box-sizing: border-box;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: ${props => (props.disabled ? 'white' : '#f8f8f8')};
  }
`;

export const WordChip = styled.button<{ $selected: boolean; disabled: boolean }>`
  background-color: ${props => (props.$selected ? '#f4f5f7' : 'white')};
  color: ${props => (props.$selected ? '#bbbbbb' : '#333333')};
  padding: 0.5rem 0.75rem;
  border: 0.0625rem solid #e0e0e0;
  border-radius: 0.75rem;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  font-size: 1rem;
  font-weight: 500;
  opacity: ${props => (props.disabled && props.$selected ? 0.5 : 1)};
  transition: all 0.2s ease;
  min-width: 3rem;
  max-width: 100%;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0.25rem;
  box-sizing: border-box;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: ${props => (props.$selected ? '#f4f5f7' : '#f8f8f8')};
  }
`;
