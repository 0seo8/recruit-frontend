'use client';

import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  z-index: 10;
`;

export const Left = styled.div`
  width: 1.5rem;
`;

export const Center = styled.div`
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

export const Right = styled.div`
  width: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;
