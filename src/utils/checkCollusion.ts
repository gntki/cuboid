import type {Box} from "three/geometry/box.ts";

export const checkCollusion = (box1: Box, box2: Box): boolean =>  {
  const collusiontX = box1.right >= box2.left && box1.left <= box2.right;
  const collusiontZ = box1.front <= box2.back && box1.back >= box2.front;
  const collusiontY = box1.bottom + box1.velocity.y <= box2.top;

  return collusiontX && collusiontZ && collusiontY
}