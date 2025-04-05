'use client';

import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
`;

export const Left = styled.div`
  width: 24px;
`;

export const Center = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

export const Right = styled.div`
  width: 24px;
  display: flex;
  justify-content: flex-end;
`;
