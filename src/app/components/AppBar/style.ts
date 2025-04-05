import styled from "styled-components";
import { Typography } from "../Typography";

export const Header = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 64px;
  padding: 0 16px;

  ${Typography.Heading6};
`;

export const Left = styled.div`
  flex: 1 1 0;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Center = styled.div`
  flex: 1 1 auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Right = styled.div`
  flex: 1 1 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
