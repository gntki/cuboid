import * as THREE from 'three'
import {Box} from "three/geometry/box.ts";

export class Ground extends Box {
  texture

  constructor({sizes, color = 0x00ff00, position, velocity, texture = null}) {
    const geometry = new THREE.BoxGeometry(sizes.width, sizes.height, sizes.depth);
    const material = new THREE.MeshStandardMaterial({map: texture})

    super({geometry, material, sizes, color, position, velocity});

    this.texture = texture;
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(3, 15);
    this.receiveShadow = true;

    this.update = this.update.bind(this);
  }

  update(delta) {
    this.updateSides();

    this.texture.offset.y += 0.02 * delta;
  }

}
