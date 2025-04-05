"use client";

import styled, { css } from "styled-components";

export const Typography = {
  Heading4: css`
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
  `,

  Heading6: css`
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  `,

  ButtonMedium: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
  `,

  Body2: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
};

export const Heading4 = styled.h4`
  ${Typography.Heading4}
`;

export const Heading6 = styled.h6`
  ${Typography.Heading6}
`;

export const ButtonMedium = styled.span`
  ${Typography.ButtonMedium}
`;

export const Body2 = styled.span`
  ${Typography.Body2}
`;
