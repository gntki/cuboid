import {useAppStore} from "stores";
import {End, Start} from "@components";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import type {ReactNode} from "react";
import {MainStyled, Subpage} from "./main.style.ts";

export const Main = () => {
  const {page} = useAppStore();

  const pages = {
    start: <Start/>,
    end: <End/>,
    game: <div style={{pointerEvents: 'none'}}/>
  }

  return (
    <MainStyled>
      <SwitchTransition>
        <CSSTransition key={page} timeout={300}>
          <Subpage>{pages[page] as ReactNode}</Subpage>
        </CSSTransition>
      </SwitchTransition>
    </MainStyled>
  )
}

export default Main
