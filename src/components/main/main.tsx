import {useAppStore} from "stores";
import {MainStyled} from "./main.style.ts";
import {useEffect, useState} from "react";

export const Main = () => {
  const {page} = useAppStore();
  const [e, setEvent] = useState<DeviceMotionEvent | null>(null);



  useEffect(() => {
    window.addEventListener("devicemotion", (event) => {
      setEvent(event)
    });

    return ()=> window.removeEventListener("devicemotion", (event) => {
      setEvent(event)
    });
  }, []);

  return (
    <MainStyled $isGame={page === 'game'}>
      <p>e.acceleration.x </p><p>{e?.acceleration?.x}</p>
      <p>e.acceleration.y </p><p>{e?.acceleration?.y}</p>
      <p>e.acceleration.z </p><p>{e?.acceleration?.z}</p>
      <p>e.accelerationIncludingGravity.x </p><p>{e?.accelerationIncludingGravity?.x}</p>
      <p>e.accelerationIncludingGravity.y </p><p>{e?.accelerationIncludingGravity?.y}</p>
      <p>e.accelerationIncludingGravity.z </p><p>{e?.accelerationIncludingGravity?.z}</p>
      <p>e.rotationRate.alpha </p><p>{e?.rotationRate?.alpha}</p>
      <p>e.rotationRate.beta </p><p>{e?.rotationRate?.beta}</p>
      <p>e.rotationRate.gamma </p><p>{e?.rotationRate?.gamma}</p>
    </MainStyled>
  )
}

export default Main
