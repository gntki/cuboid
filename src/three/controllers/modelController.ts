import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export class ModelController {
  scene: THREE.Group;
  mixer: THREE.AnimationMixer;
  animations: { [key: string]: THREE.AnimationAction } = {};


  constructor() {
  }


  static async create(source: string, shadows: boolean = false) {
    const instance = new ModelController();
    await instance.initModel(source, shadows);
    return instance
  }


  async initModel(source, shadows) {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(
        source,
        (gltf) => {
          this.scene = gltf.scene;
          const animations = gltf.animations;

          if (animations && animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(this.scene);
            animations.forEach((clip, index) => {
              this.animations[clip.name || `animation_${index}`] = this.mixer.clipAction(clip);
            });
          }

          if(shadows) {
            this.enableShadows();
          }

          console.log('Model loaded successfully');
          resolve();
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (e) => {
          console.error('Error loading model:', e);
          reject(e);
        }
      );
    });

  }


  enableShadows() {
    if (!this.scene) return;

    this.scene.traverse((child) => {
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