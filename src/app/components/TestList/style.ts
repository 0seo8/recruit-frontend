import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: white;
`;

export const ListItem = styled.div<{ isLast: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: ${props => (props.isLast ? 'none' : '1px solid #eee')};
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const DateText = styled.div`
  font-size: 12px;
  color: #555555;
`;

export const ArrowIcon = styled.div`
  color: #999;
  font-size: 18px;
`;

export const EmptyText = styled.p`
  text-align: center;
  color: #666;
  padding: 24px;
  background-color: white;
`;
