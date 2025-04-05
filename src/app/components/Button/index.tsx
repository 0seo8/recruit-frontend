import type { HTMLProps } from "react";
import * as S from "./style";

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: "primary" | "outline";
};

export function Button({ type = "primary", ...props }: ButtonProps) {
  return <S.Button type={type} {...props} />;
}
