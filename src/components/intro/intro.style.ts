import styled from "styled-components";

import bg from '@images/bg.jpg'

export const IntroStyled = styled.section`
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    width: 100%;
    min-height: 100svh;
    background: url(${bg}) no-repeat center/cover;
`

export const Canvas = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`