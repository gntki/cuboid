import styled from "styled-components";

import {COLORS} from "@constants/constants.ts";

export const Start = styled.div`
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
  width: 600rem;
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
  font-size: 24rem;
  line-height: 1.4;
  white-space: pre-line;
`
export const Control = styled(Text)`
  font-size: 20rem;
  margin: 20rem 0 15rem;
`

export const Note = styled(Text)`
  margin: 0 0 24rem;
  font-size: 24rem;
  text-align: center;
  line-height: 1.4;
  white-space: pre-line;
`
