import * as THREE from 'three'
import {Box} from "three/controllers/objects/box.ts";
import type {GroundProps} from "three/controllers/objects/types.ts";

export class Ground extends Box {
  texture: THREE.Texture | null = null;

  constructor({sizes, color = 0x00ff00, position, velocity, texture = null}: GroundProps) {
    const geometry = new THREE.BoxGeometry(sizes.width, sizes.height, sizes.depth);
    const material = new THREE.MeshStandardMaterial({map: texture})

    super({geometry, material, sizes, color, position, velocity});

    if(texture) {
      this.texture = texture;
      this.texture.wrapS = THREE.RepeatWrapping;
      this.texture.wrapT = THREE.RepeatWrapping;
      this.texture.repeat.set(3, 15);
    }

    this.receiveShadow = true;

    this.update = this.update.bind(this);
  }

  update(delta: number) {
    this.updateSides();

    if(this.texture) {
      this.texture.offset.y += 0.02 * delta;
    }
  }

}
