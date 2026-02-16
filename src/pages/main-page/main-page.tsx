import * as S from './main-page.style.ts'
import {Game, Main} from "@components";


export const MainPage = () => {

  return (
    <S.MainPageStyle>
      <Main/>
      <Game/>
    </S.MainPageStyle>
  )
}

export default MainPage