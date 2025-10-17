import * as THREE from 'three'
import {Box} from "three/geometry/box.ts";

export class Enemy extends Box {
  model

  constructor({sizes, color = 0x00ff00, position, velocity, modelController = null, modelScale = null}) {
    const geometry = new THREE.BoxGeometry(sizes.width, sizes.height, sizes.depth);
    const material = new THREE.MeshStandardMaterial({color: color, visible: false})

    super({geometry, material, sizes, color, position, velocity});

    this.addModel(modelController, modelScale);

    this.update = this.update.bind(this);
  }

  addModel(modelController, modelScale) {
    if (!modelController) return;

    this.model = modelController.scene.clone();

    const {x, y, z} = modelScale;
    this.model.scale.set(x, y, z);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
  }


  update(ground, delta) {
    this.updateSides();

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.velocity.z += .001 * delta;
    this.model.rotation.x += this.velocity.z;

    this.applyGravity(ground);
  }
}
