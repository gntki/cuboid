import * as S from './main-page.style.ts'
import {End, Game, Start} from "@components";
import {useAppStore} from "stores";
import type {ReactNode} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";


export const MainPage = () => {
  const {page} = useAppStore();

  const pages = {
    start: <Start/>,
    end: <End/>
  }

  return (
    <S.MainPageStyle>
      <SwitchTransition>
        <CSSTransition>
          <S.Subpage>{pages[page] as ReactNode}</S.Subpage>
        </CSSTransition>
      </SwitchTransition>
      <Game/>
    </S.MainPageStyle>
  )
}

export default MainPage