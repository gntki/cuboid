import styled from "styled-components";


export const MainStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
`

export const Subpage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  
  &.enter {
    opacity: 0;
  }
  
  &.enter-active,
  &.enter-done,
  &.exit {
    opacity: 1;
    transition: .3s ease-in-out;
  }
  
  &.exit-active {
    opacity: 0;
    transition: .3s ease-in-out;
  }
`