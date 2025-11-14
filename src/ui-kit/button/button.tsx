
import * as S from './button.style.ts'
import {JSX} from "react";

export const Button: (props) => JSX.Element = (props) => {
  return <S.Button {...props}></S.Button>
}

export default Button
