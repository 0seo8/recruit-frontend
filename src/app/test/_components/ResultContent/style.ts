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
