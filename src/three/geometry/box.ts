import * as THREE from 'three'
import {checkCollusion} from "utils/checkCollusion.ts";
import type {BoxProps} from "three/geometry/types.ts";
import type {XYZType} from "@constants/settings.ts";
import type {Ground} from "three/geometry/ground.ts";

export class Box extends THREE.Mesh {
  //main
  sizes;
  color: number
  //sides
  top: number = 0;
  bottom: number = 0;
  left: number = 0;
  right: number = 0;
  front: number = 0;
  back: number = 0;
  //settings
  velocity = {x: 0, y: 0, z: 0}
  gravity: number = -0.01;


  constructor({geometry, material, sizes, color = 0x00ff00, position, velocity}: BoxProps) {
    super(geometry, material);

    this.sizes = sizes;
    this.color = color;

    this.initPosition(position);
    this.initVelocity(velocity);
    this.updateSides();
  }

  initPosition(position: XYZType) {
    const {x, y, z} = position;
    this.position.set(x, y, z)
  }

  initVelocity(velocity: XYZType) {
    const {x, y, z} = velocity;
    this.velocity.x = x;
    this.velocity.y = y;
    this.velocity.z = z;
  }

  updateSides() {
    const {x, y, z} = this.position;
    const {width, height, depth} = this.sizes;

    this.top = y + height / 2;
    this.bottom = y - height / 2;

    this.left = x - width / 2;
    this.right = x + width / 2;

    this.front = z - depth / 2;
    this.back = z + depth / 2;
  }

  applyGravity(ground: Ground) {
    this.velocity.y += this.gravity;

    if (checkCollusion(this, ground)) {
      this.velocity.y *= .8;
      this.velocity.y = -this.velocity.y
    } else this.position.y += this.velocity.y
  }


}
