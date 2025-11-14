import * as S from './game.style.ts'
import {useEffect, useRef} from "react";
import {Controller} from "three/scenes/controller.ts";
import {useAppStore} from "stores";


export const Game = () => {
  const {isGameStart, setGameStart, setPage} = useAppStore()
  const sceneRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Controller | null>(null);

  useEffect(() => {
    if(!sceneRef?.current) return;

    const size = {w: window?.innerWidth, h: window.innerHeight};

    if(isGameStart) {
      gameRef.current = new Controller(sceneRef.current, ()=> setGameStart(false), size);
      gameRef.current?.startGame();
    } else if(!isGameStart && gameRef?.current?.animationId && gameRef?.current?.animationId > 0) {
      gameRef.current?.destroy();
      gameRef.current = null;
      setPage('end');
    }

  }, [sceneRef?.current, isGameStart]);


  return (
    <S.GameStyled>
      <S.Canvas ref={sceneRef}/>
    </S.GameStyled>
  )
}

export default Game
