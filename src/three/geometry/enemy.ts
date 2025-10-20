import * as THREE from 'three'
import {Box} from "three/geometry/box.ts";
import type {ModelController} from "three/controllers/modelController.ts";
import type {EnemyProps} from "three/geometry/types.ts";
import type {XYZType} from "@constants/settings.ts";
import type {Ground} from "three/geometry/ground.ts";

export class Enemy extends Box {
  model: THREE.Object3D | null = null;

  constructor({sizes, color = 0x00ff00, position, velocity, modelController = null, modelScale = null}: EnemyProps) {
    const geometry = new THREE.BoxGeometry(sizes.width, sizes.height, sizes.depth);
    const material = new THREE.MeshStandardMaterial({color: color, visible: false})

    super({geometry, material, sizes, color, position, velocity});

    if(modelController && modelScale) {
      this.addModel(modelController, modelScale);
    }

    this.update = this.update.bind(this);
  }

  addModel(modelController: ModelController, modelScale: XYZType) {
    if (!modelController.scene) return;

    this.model = modelController.scene.clone();

    const {x, y, z} = modelScale;
    this.model.scale.set(x, y, z);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
  }


  update(ground: Ground, delta: number) {
    this.updateSides();

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.velocity.z += .001 * delta;

    if(!this.model) return;
    this.model.rotation.x += this.velocity.z;

    this.applyGravity(ground);
  }
}
