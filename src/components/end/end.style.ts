import styled from "styled-components";

import {COLORS} from "@constants/constants.ts";

export const End = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 100%;
  pointer-events: all;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25rem 25rem 30rem;
  width: 700rem;
  color: ${COLORS.WHITE};
  text-align: center;
  background: rgba(0,0,0,.5);
  -webkit-backdrop-filter: blur(20rem);
  backdrop-filter: blur(20rem);
  border-radius: 10rem;
`

export const Title = styled.h1`
  font-size: 44rem;
  margin: 0 0 20rem;
`

export const Text = styled.p`
  margin: 0 0 24rem;
  font-size: 24rem;
  line-height: 1.4;
  white-space: pre-line;
`


