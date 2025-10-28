import styled from "styled-components";


export const GameStyled = styled.section`
    display: flex;
    position: relative;
    width: 100%;
    min-height: 100%;
`

export const Canvas = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`