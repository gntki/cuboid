import * as S from './game.style.ts'
import {useEffect, useRef} from "react";
import {Controller} from "three/scenes/controller.ts";


export const Game = () => {
  const sceneRef = useRef<HTMLCanvasElement | null>(null);


  useEffect(() => {
    const size = {w: window?.innerWidth, h: window.innerHeight};

    if(sceneRef?.current) {
      new Controller(sceneRef.current, size);
    }

  }, [sceneRef.current]);

  return (
    <S.GameStyled>
      <S.Canvas ref={sceneRef}/>
    </S.GameStyled>
  )
}

export default Game
