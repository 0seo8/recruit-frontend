import styled from 'styled-components';

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
  background-color: #ffffff;
  width: 90%;
  max-width: 25rem;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  border: 0.0625rem solid transparent;
  box-shadow:
    0 0 0 0.0625rem #50d6f9,
    0 0 0 0.125rem #00d37a,
    0 0.25rem 1rem rgba(0, 0, 0, 0.1);
`;

export const CircleProgressContainer = styled.div`
  width: 10rem;
  height: 10rem;
  margin-bottom: 2rem;
`;

export const CircleProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0.375rem solid #f5f5f5;
    box-sizing: border-box;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    background: conic-gradient(
      from -90deg,
      #50d6f9 0%,
      #00d37a ${props => props.$progress * 100}%,
      transparent ${props => props.$progress * 100}%,
      transparent 100%
    );
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 0.375rem),
      #fff calc(100% - 0.375rem)
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 0.375rem),
      #fff calc(100% - 0.375rem)
    );
  }

  & > span {
    content: '';
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    background: #00d37a;
    border-radius: 50%;
    transform: rotate(${props => props.$progress * 360 - 90}deg) translate(0, -88%);
    z-index: 2;
  }
`;

export const ModalTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  border-radius: 1rem;
`;

export const ModalSubText = styled.div`
  font-size: 1rem;
  color: #16181b;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.5;
`;

export const HintInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  white-space: nowrap;
`;

export const HintLabel = styled.span`
  background-color: #ff7448;
  color: white;
  padding: 0.25rem 0.625rem;
  font-size: 0.875rem;
  font-weight: 700;
  margin-right: 0.25rem;
  border-radius: 0.75rem;
`;

export const HintText = styled.span`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #ff7448;
`;

export const ErrorText = styled.p`
  color: #ff7448;
  text-align: center;
`;

export const CountdownNumber = styled.div`
  font-size: 5.25rem;
  font-weight: 700;
  color: #333333;
  z-index: 2;
  text-align: center;
  line-height: 1;
`;
