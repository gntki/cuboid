import * as S from './start.style.ts'
import parse from 'html-react-parser'

export const Start = () => {


  return (
    <S.Start>
      <S.Content>
        <S.Title>🪨 Каменный Забег 🏃‍♀️</S.Title>
        <S.Text>{parse("Вперёд, к&nbsp;приключениям! Твой герой уже бежит, но&nbsp;горные обвалы не&nbsp;дремлют&nbsp;&mdash; гигантские валуны несутся навстречу!")}</S.Text>
        <S.Control>{parse("Управление:\nW&nbsp;&mdash; Давай вперёд\nA/D&nbsp;&mdash; Сместиться в&nbsp;сторону\nS&nbsp;&mdash; Шаг назад")}</S.Control>
        <S.Note>Прояви ловкость и&nbsp;стань легендой ущелья!</S.Note>
      </S.Content>
    </S.Start>
  )
}

export default Start
