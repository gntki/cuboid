import * as S from './game.style.ts'
import {useLayoutEffect, useRef} from "react";
import {Controller} from "three/scenes/controller.ts";


export const Game = () => {
  const sceneRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const size = {w: window?.innerWidth, h: window.innerHeight};

    if(sceneRef?.current)
      new Controller(sceneRef.current, size);
  }, [sceneRef.current, window]);

  return (
    <S.GameStyled>
      <S.Canvas ref={sceneRef}/>
    </S.GameStyled>
  )
}

export default Game
