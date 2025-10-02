import * as THREE from 'three'
import {COLOR_BASE, GeometryPack} from "@constants/constants.ts";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Box} from "utils/geometry/box.ts";
// @ts-ignore


export class Controller {
  private el: HTMLCanvasElement;
  private size: { w: number, h: number } = {w: 0, h: 0};
  private scene: THREE.Scene;
  private group: THREE.Group;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private orbitControls: OrbitControls;

  private clock: THREE.Clock;
  private stats;

  cube: Box;
  ground: Box;


  constructor(el: HTMLCanvasElement, size) {
    this.el = el;
    this.size.w = size.w;
    this.size.h = size.h;
    this.scene = new THREE.Scene();

    this.tick = this.tick.bind(this);

    this.init();
  }


  init() {
    // this.createAxesHelper();
    this.createObjects();
    this.createLights();
    this.createCamera();
    this.createRender();
    this.createStats();

    this.setControls();

    this.clock = new THREE.Clock();
    this.tick();

    this.addResizeListener();
  }


  createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(7);
    this.scene.add(axesHelper);
  }


  createObjects() {
    this.cube = new Box(1, 1, 1, 0x00ff00, {x: 0, y: 3, z: 0}, {x:0,y:-.1,z:0});
    this.ground = new Box(5, .5, 10, 0x0000ff, {x: 0, y: 0, z: 0}, {x:0,y:0,z:0});
    this.scene.add(this.ground);
    this.scene.add(this.cube);

  }

  createLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 2, 3);
    dirLight.castShadow = true;

    this.scene.add(ambientLight);
    this.scene.add(dirLight);
  }


  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.size.w / this.size.h);
    this.camera.position.set(0, 3, 6);
    this.scene.add(this.camera);
  }


  createRender() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.el});
    this.renderer.setSize(this.size.w, this.size.h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.render(this.scene, this.camera);
  }

  createStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom)
  }


  setControls() {
    //orbitControls
    this.orbitControls = new OrbitControls(this.camera, this.el);
    this.orbitControls.enableDamping = true;
  }


  tick() {
    this.stats.begin();
    this.orbitControls.update();

    this.cube.velocity.x = 0;
    this.cube.velocity.z = 0;

    if(this.cube.keys.forward) this.cube.velocity.z -= .1;
    if(this.cube.keys.back) this.cube.velocity.z += .1;
    if(this.cube.keys.left) this.cube.velocity.x -= .1;
    if(this.cube.keys.right) this.cube.velocity.x += .1;

    this.cube.update(this.ground);

    this.renderer.render(this.scene, this.camera);
    this.stats.end();
    window.requestAnimationFrame(this.tick);
  }


  addResizeListener() {
    window.addEventListener('resize', () => {
      this.size.w = window.innerWidth;
      this.size.h = window.innerHeight

      this.camera.aspect = this.size.w / this.size.h;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.size.w, this.size.h);
      // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.render(this.scene, this.camera);
    })
  }

}

