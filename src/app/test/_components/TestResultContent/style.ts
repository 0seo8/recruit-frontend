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

export const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 5rem;
  margin-top: 1.5rem;
`;

export const ResultImage = styled.div`
  margin-bottom: 1.5rem;
  width: 11.25rem;
  height: 11.25rem;
`;

export const ResultTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #161616;
  margin-bottom: 0.75rem;
  text-align: center;
`;

export const ResultText = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #161616;
  margin-bottom: 2rem;
  text-align: center;
`;

export const ScoreDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

export const ScoreText = styled.span<{ $status?: 'fail' | 'good' | 'perfect' }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => {
    if (props.$status === 'fail') return '#ff5252';
    if (props.$status === 'perfect') return '#2196f3';
    return '#36d9bf';
  }};
`;

export const ProblemList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;
`;

export const ProblemItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
`;

export const StatusIcon = styled.div<{ $isCorrect: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  background-color: ${props => (props.$isCorrect ? '#4caf50' : '#e53935')};
  color: white;
  font-weight: bold;
`;

export const BadgesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ProblemTooltip = styled.div<{ $show: boolean; $status?: 'fail' | 'good' | 'perfect' }>`
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  opacity: ${props => (props.$show ? 1 : 0)};
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  min-width: 15rem;
  z-index: 10;
  text-align: center;
  font-size: 0.875rem;
  color: #333;
  border-top: 0.25rem solid;
  border-top-color: ${props => {
    if (props.$status === 'fail') return '#ff5252';
    if (props.$status === 'perfect') return '#2196f3';
    return '#36d9bf';
  }};
`;

export const BadgeWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Badge = styled.div<{ $isCorrect: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  background-color: ${props => {
    if (props.$isCorrect) {
      return '#4caf50'; // 정답 뱃지 색상
    }
    return '#e53935'; // 오답 뱃지 색상
  }};
`;

export const PerfectBadge = styled(Badge)`
  background-color: #2196f3; // 퍼펙트 상태 뱃지 색상
`;

export const GoodBadge = styled(Badge)`
  background-color: #36d9bf; // 좋음 상태 뱃지 색상
`;

export const FailBadge = styled(Badge)`
  background-color: #ff5252; // 실패 상태 뱃지 색상
`;

export const ProblemText = styled.span`
  font-size: 1rem;
  color: #333;
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

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #36d9bf 0%, #29c79b 100%);
  color: white;
  width: 100%;
  max-width: 25rem;
  padding: 1rem;
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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

export const ErrorText = styled.p`
  color: #e53935;
  text-align: center;
`;
