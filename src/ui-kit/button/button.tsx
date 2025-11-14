import type { ReactNode } from "react";
import * as S from './button.style.ts'

export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <S.Button onClick={props.onClick}>{children}</S.Button>;
}
export default Button
