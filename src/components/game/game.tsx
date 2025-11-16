import * as S from './game.style.ts'
import {useEffect, useRef} from "react";
import {Controller} from "three/scenes/controller.ts";
import {useAppStore} from "stores";


export const Game = () => {
  const {page, isGameStart, setGameStart, setPage} = useAppStore()
  const sceneRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Controller | null>(null);

  useEffect(() => {
    if(page!=='start' || !sceneRef?.current) return;
    const size = {w: window?.innerWidth, h: window.innerHeight};
    gameRef.current = new Controller(sceneRef.current, ()=> setGameStart(false), size);
  }, [page]);

  useEffect(() => {
    if(!gameRef.current) return;

    if(isGameStart) {
      gameRef.current?.startGame();
    } else if(!isGameStart && page==='game') {
      setPage('end');
      gameRef.current?.destroy();
      gameRef.current = null;
    }

  }, [gameRef?.current, isGameStart, page]);


  return (
    <S.GameStyled>
      <S.Canvas ref={sceneRef}/>
    </S.GameStyled>
  )
}

export default Game
