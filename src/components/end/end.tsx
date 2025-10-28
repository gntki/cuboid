import * as S from './end.style.ts'
import parse from 'html-react-parser'
import {Button} from "@ui-kit";

export const End = () => {


  return (
    <S.End>
      <S.Content>
        <S.Title>Ущелье тебя не пустило! ⛰️</S.Title>
        <S.Text>{parse("Твой забег завершён... на этот раз. Гора проверила тебя на прочность и нашла слабое место.")}</S.Text>
        <Button>Ещё заход</Button>
      </S.Content>
    </S.End>
  )
}

export default End
