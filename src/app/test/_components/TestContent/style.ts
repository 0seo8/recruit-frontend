import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem 1rem 5rem 1rem;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3.5rem);
  position: relative;
  overflow-y: auto;
`;

export const TestHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const ProgressBar = styled.div`
  height: 0.25rem;
  width: 100%;
  position: relative;
  margin-bottom: 0.75rem;
  display: flex;
  gap: 0.25rem;
  background-color: transparent;
`;

export const ProgressItem = styled.div<{
  $filled: boolean;
  $color?: string;
  $isCorrect?: boolean | null;
}>`
  flex: 1;
  height: 100%;
  border-radius: 0.125rem;
  background-color: ${props => {
    if (props.$color) return props.$color;

    if (!props.$filled) return '#646962'; // 비활성화 컬러

    if (props.$isCorrect === true) return '#59dc94'; // 성공 컬러
    if (props.$isCorrect === false) return '#ff414d'; // 실패 컬러

    return '#646962'; // 기본 컬러
  }};
  transition: background-color 0.3s ease;
`;

export const ProgressText = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  text-align: right;
`;

export const ProblemTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  text-align: left;
  line-height: 1.4;
`;

export const SelectedWordsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.625rem;
  min-height: 1.5rem;
`;

export const SelectedWord = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  margin-right: 0.25rem;
`;

export const AnswerArea = styled.div`
  margin-bottom: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const AnswerEmptyLine = styled.div`
  height: 0.0625rem;
  background-color: #cccccc;
  width: 100%;
`;

export const WordChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  background-color: #f5f5f5;
  padding: 1.25rem;
  border-radius: 0.5rem;
  min-height: 12.5rem;
  max-height: 18.75rem;
  overflow-y: auto;
`;

export const WordChip = styled.button<{ $selected: boolean; disabled: boolean }>`
  background-color: ${props => (props.$selected ? '#E0E0E0' : '#4A90E2')};
  color: ${props => (props.$selected ? '#9E9E9E' : 'white')};
  padding: 0;
  border: none;
  border-radius: 1.5rem;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  font-size: 1rem;
  font-weight: 500;
  opacity: ${props => (props.disabled || props.$selected ? 0.7 : 1)};
  transition: all 0.2s ease;
  width: 6.875rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background-color: ${props => (props.$selected ? '#E0E0E0' : '#3F7EC9')};
  }
`;

export const BottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 0.0625rem solid #eeeeee;
  width: 100%;
  background-color: white;
  margin-top: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  height: 5rem;
  box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.05);
`;

export const TimeLeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
`;

export const SubmitButtonContainer = styled.div`
  padding-left: 1.5rem;
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const TimeLeftLabel = styled.span`
  font-size: 1rem;
  color: #333;
  margin-right: 0.5rem;
`;

export const TimeLeftValue = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333333;
`;

export const HintButton = styled.button`
  background: linear-gradient(135deg, #36d9bf 0%, #2ec7cb 100%);
  color: white;
  width: 3.75rem;
  height: 3.75rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: fixed;
  right: 1rem;
  bottom: 6.25rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.2);
  z-index: 10;

  &:hover {
    background: linear-gradient(135deg, #2ec7cb 0%, #36d9bf 100%);
  }

  &:disabled {
    background: #cccccc;
    cursor: default;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #36d9bf 0%, #29c79b 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 12.5rem;

  &:hover {
    background: linear-gradient(135deg, #29c79b 0%, #36d9bf 100%);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(0.1875rem);
`;

export const ModalCard = styled.div`
  background-color: white;
  width: 90%;
  max-width: 20rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  border: 0.0625rem solid #e0e0e0;
`;

export const CircleProgressContainer = styled.div`
  width: 10rem;
  height: 10rem;
  margin-bottom: 3rem;
  margin-top: 2.25rem;
`;

export const ErrorText = styled.p`
  color: #e53935;
  text-align: center;
`;
