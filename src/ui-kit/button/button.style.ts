import styled from "styled-components";

import {COLORS} from "@constants/constants.ts";

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 280rem;
  height: 54rem;
  border-radius: 12rem;
  font-size: 33rem;
  color: ${COLORS.BLACK};
  font-variation-settings: 'wght' 500;
  letter-spacing: -.8rem;
  background: rgba(255, 255, 255, .9);
  border: transparent;
  box-shadow: 2rem 2rem 20rem rgba(255, 255, 255, .1);
  cursor: pointer;
  transition: .3s ease-in-out;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 2rem 2rem 20rem rgba(255, 255, 255, .3);
  }
  
`