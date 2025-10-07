export const enemySpanSpeed = (fr: number): number =>  {
  let val = 100;
  if(fr> 500) val-=50;
  if(fr> 1000) val-=20;
  if(fr> 2000) val-=10;
  if(fr> 3000) val-=10;
  return val;
}