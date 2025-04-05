import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  max-width: 100%;
  margin: 0 auto;
  height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
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

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1rem;
  padding-bottom: 5rem; /* 버튼 공간 확보 */
`;

export const ResultIcon = styled.div`
  margin-bottom: 1.5rem;
`;

export const ResultText = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2.5rem;
`;

export const ColoredText = styled.span<{ $isCorrect: boolean }>`
  color: ${props => (props.$isCorrect ? '#4caf50' : '#e53935')};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: white;
`;

export const NextButton = styled.button`
  background: linear-gradient(135deg, #36d9bf 0%, #29c79b 100%);
  color: white;
  width: 100%;
  max-width: 25rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    background: linear-gradient(135deg, #29c79b 0%, #36d9bf 100%);
  }
`;
