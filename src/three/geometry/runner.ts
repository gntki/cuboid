import * as THREE from 'three'
import {Box} from "three/geometry/box.ts";

export class Runner extends Box {
  keys = {
    forward: false,
    back: false,
    left: false,
    right: false,
    jump: false
  }

  model
  animations

  constructor({sizes, color = 0x00ff00, position, velocity, modelController = null, modelScale = null}) {
    const geometry = new THREE.BoxGeometry(sizes.width, sizes.height, sizes.depth);
    const material = new THREE.MeshStandardMaterial({color: color, visible: false})

    super({geometry, material, sizes, color, position, velocity});


    this.addModel(modelController, modelScale);

    this.update = this.update.bind(this);
    this.addListeners();
  }


  addModel(modelController, modelScale) {
    if(!modelController) return;

    this.model = modelController.scene;
    this.model.position.y = -.5;

    this.animations = modelController.animations

    const {x,y,z} = modelScale;
    this.model.scale.set(x, y, z);
    this.model.rotation.y = Math.PI;
    this.add(this.model);

    if(this.animations) {
      this.initAnimation()
    }
  }

  initAnimation() {
    this.animations['animation_0'].play();
  }

  update(ground, delta) {
    this.updateSides();
    this.movementHandler(delta)

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.applyGravity(ground);
  }

  keyCodeHandler(code, value) {
    switch (true) {
      case (code === "KeyW"):
        this.keys.forward = value;
        break;
      case (code === "KeyS"):
        this.keys.back = value;
        break;
      case (code === "KeyA"):
        this.keys.left = value;
        break;
      case (code === "KeyD"):
        this.keys.right = value;
        break;
    }
  }

  movementHandler(delta) {
    this.velocity.x = 0;
    this.velocity.z = 0;

    if (this.keys.forward) this.velocity.z -= .1 * delta;
    if (this.keys.back) this.velocity.z += .1 * delta;
    if (this.keys.left) this.velocity.x -= .1 * delta;
    if (this.keys.right) this. velocity.x += .1 * delta;
  }

  addListeners() {
    window.addEventListener("keydown", e => {
      this.keyCodeHandler(e.code, true)
    })

    window.addEventListener("keyup", e => {
      this.keyCodeHandler(e.code, false)
    })
  }
}
