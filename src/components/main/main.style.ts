import styled, {css} from "styled-components";


export const MainStyled = styled.section<{$isGame: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  font-size: 12rem;
  z-index: 1;
  pointer-events: none;
  
  
  p {
    margin: 0 0 15rem;
  }
  
  ${({$isGame}) => $isGame && css`
    &:after {
      opacity: 0;
    }
  `}
`

export const Subpage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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