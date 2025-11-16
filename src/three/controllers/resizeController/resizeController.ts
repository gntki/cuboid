import type {resizeControllerProps} from "three/controllers/resizeController/types.ts";

export class ResizeController implements resizeControllerProps {
  size;
  scene;
  camera;
  renderer;

  constructor({size, scene, camera, renderer}: resizeControllerProps) {
    this.size = {...size};
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.resizeHandler = this.resizeHandler.bind(this);
  }

  resizeHandler() {
    this.size.w = window.innerWidth;
    this.size.h = window.innerHeight

    this.camera.aspect = this.size.w / this.size.h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.size.w, this.size.h);
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
  }

  addResizeListener() {
    window.addEventListener('resize', this.resizeHandler)
  }

  removeResizeListener() {
    window.removeEventListener('resize', this.resizeHandler)
  }
}