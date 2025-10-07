import * as THREE from 'three'

export class ModelController {
  model;
  private mixer: THREE.AnimationMixer;
  private animations: {[key: string]: THREE.AnimationAction} = {};

  // positions;


  constructor(model, positions) {
    // this.positions = positions;

    this.initModel(model);
  }


  initModel(model) {
    this.model = model.scene;
    this.model.castShadow = true;
    // const animations = model.animations;

    this.model.scale.set(1,1,1);
    // this.model.position.set(this.radius * Math.cos(this.angle), 0.1, this.radius * Math.sin(this.angle));

    // if(animations && animations.length > 0) {
    //   this.mixer = new THREE.AnimationMixer(this.model)
    //
    //   this.animations.walk = this.mixer.clipAction(animations[0]);
    // }
  }


  enableShadows() {
    this.model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.frustumCulled = true;
      }
    });

    console.log('Shadows enabled for model');
  }

  updateMixer(delta) {
    this.mixer.update(delta);
  }

}