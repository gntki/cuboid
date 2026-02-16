import {useAppStore} from "stores";
import {MainStyled} from "./main.style.ts";
import {useEffect, useState} from "react";

export const Main = () => {
  const {page} = useAppStore();
  const [e, setEvent] = useState<DeviceMotionEvent | null>(null);



  useEffect(() => {
    let lastUpdate = 0;

    const handler = (event: DeviceMotionEvent) => {
      const now = Date.now();
      if (now - lastUpdate < 200) return; // ⏱ 5 раз в секунду

      lastUpdate = now;
      setEvent(event);
    };

    window.addEventListener("devicemotion", handler);
    return () => window.removeEventListener("devicemotion", handler);
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
