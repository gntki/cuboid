import * as S from './main-page.style.ts'
import {Game, Start} from "@components";


export const MainPage = () => {
  const page = 'start'

  const pages = {
    start: <Start/>
  }


  return (
    <S.MainPageStyle>
      {/*{pages[page]}*/}
      <Game/>
    </S.MainPageStyle>
  )
}

export default MainPage
