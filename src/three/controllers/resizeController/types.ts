import * as THREE from 'three'
export interface resizeControllerProps {
  size: {
    w: number,
    h: number
  }
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
}