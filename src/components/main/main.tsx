import {useAppStore} from "stores";
import {MainStyled} from "./main.style.ts";
import {useEffect, useState} from "react";

export const Main = () => {
  const {page} = useAppStore();
  const [e, setEvent] = useState<DeviceMotionEvent | null>(null);
  const [orientation, setOrientation] = useState<{
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
  } | null>(null);

  const requestPermission = async () => {
    console.log('click')
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      await (DeviceOrientationEvent as any).requestPermission();
    }
  };

  useEffect(() => {
    const init = async () => {
      await requestPermission();
    };
    init().catch(error => {
      console.error('Failed to initialize device orientation:', error);
    });
  }, []);

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


  useEffect(() => {
    let lastUpdate = 0;

    const handler = (event: DeviceOrientationEvent) => {
      const now = Date.now();
      if (now - lastUpdate < 200) return; // throttling
      lastUpdate = now;

      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  return (
    <MainStyled $isGame={page === 'game'}>
      <p>e.acceleration.x </p><p>{e?.acceleration?.x}</p>
      <p>e.acceleration.y </p><p>{e?.acceleration?.y}</p>
      <p>e.acceleration.z </p><p>{e?.acceleration?.z}</p>
      <p>e.rotationRate.alpha </p><p>{e?.rotationRate?.alpha}</p>
      <p>e.rotationRate.beta </p><p>{e?.rotationRate?.beta}</p>
      <p>e.rotationRate.gamma </p><p>{e?.rotationRate?.gamma}</p>
      <p></p>
      <p>alpha: {orientation?.alpha?.toFixed(1)}</p>
      <p>beta: {orientation?.beta?.toFixed(1)}</p>
      <p>gamma: {orientation?.gamma?.toFixed(1)}</p>
      <button onClick={requestPermission}>дать доступы</button>
    </MainStyled>
  )
}

export default Main
