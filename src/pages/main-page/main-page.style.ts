import styled from "styled-components";
import bg from '@images/bg.jpg'

export const MainPageStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100svh;
  background: url(${bg}) no-repeat center/cover;
  overflow: hidden;
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