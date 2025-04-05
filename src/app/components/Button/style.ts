"use client";

import { colors } from "@/app/constants/style";
import styled, { css } from "styled-components";

export const Button = styled.button<{ type: "primary" | "outline" }>`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  padding: 16px;

  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }

  ${({ type }) =>
    type === "primary" &&
    css`
      border: none;
      color: ${colors.white};
      background-color: ${colors.primary050};

      &:disabled {
        background-color: ${colors.grey02};
        color: ${colors.grey03};
      }
    `}

  ${({ type }) =>
    type === "outline" &&
    css`
      border: 1px solid #d2d8e1;
      color: ${colors.grey07};
      background-color: ${colors.white};
    `}
`;
