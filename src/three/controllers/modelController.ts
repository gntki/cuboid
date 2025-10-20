import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ModelController {
  scene: THREE.Group | null = null;
  mixer: THREE.AnimationMixer | null = null;
  animations: { [key: string]: THREE.AnimationAction } = {};


  constructor() {
  }


  static async create(source: string, shadows: boolean = false) {
    const instance = new ModelController();
    await instance.initModel(source, shadows);
    return instance
  }


  async initModel(source: string, shadows: boolean): Promise<void> {
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
              this.animations[`animation_${index}`] = this.mixer!.clipAction(clip);
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
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.frustumCulled = true;
      }
    });

    console.log('Shadows enabled for model');
  }


  updateMixer(delta: number) {
    if(!this.mixer) return;
    this.mixer.update(delta);
  }

}