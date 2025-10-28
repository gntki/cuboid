import {JSX} from "react";
import * as S from './button.style.ts'

export const Button: (props) => JSX.Element = (props) => {
  return <S.Button {...props}></S.Button>
}

export default Button
