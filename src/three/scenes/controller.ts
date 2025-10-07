import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Box} from "utils/geometry/box.ts";
import {characterSettings, enemySettings, groundSettings} from "@constants/settings.ts";
import {enemySpanSpeed} from "utils/enemySpanSpeed.ts";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {ModelController} from "utils/controllers/modelController.ts";


export class Controller {
  private animationId: number = 0;

  private el: HTMLCanvasElement;
  private size: { w: number, h: number } = {w: 0, h: 0};
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private orbitControls: OrbitControls;

  private clock: THREE.Clock = new THREE.Clock();
  private stats;

  cube: Box;
  ground: Box;
  enemies: THREE.Group = new THREE.Group;

  modelController: ModelController;


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
    this.createModels();
    this.createObjects();
    this.createLights();
    this.createCamera();
    this.createRender();
    this.createStats();

    this.setControls();

    this.tick();

    this.addResizeListener();
  }


  createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(7);
    this.scene.add(axesHelper);
  }

  createModels() {
    const loader = new GLTFLoader();

    loader.load(
      'src/models/stone/scene.gltf',
      gltf => {
        this.modelController = new ModelController(gltf);
        this.modelController.enableShadows();

        // this.scene.add(this.modelController.model);
      },
      xhr => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      error => {
        console.log('Error: ', error)
      }
    )
  }

  createObjects() {
    this.cube = new Box(characterSettings);
    this.ground = new Box(groundSettings);

    this.scene.add(this.ground);
    this.scene.add(this.cube);
    this.scene.add(this.enemies);
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
    this.camera.position.set(0, 4, 6);
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
    this.animationId = requestAnimationFrame(this.tick);
    this.renderer.render(this.scene, this.camera);

    this.stats.begin();
    this.orbitControls.update();

    const mn = enemySpanSpeed(this.animationId)

    if(this.animationId % mn===0) {
      this.enemies.add(
        new Box({
          ...enemySettings,
          position: {
            ...enemySettings.position,
            x: Math.random() * (-4.5 - 4.5) + 4.5
          },
          model: this.modelController.model,
          scene: this.scene
        })
      )
    }

    this.cube.velocity.x = 0;
    this.cube.velocity.z = 0;

    if(this.cube.keys.forward) this.cube.velocity.z -= .1;
    if(this.cube.keys.back) this.cube.velocity.z += .1;
    if(this.cube.keys.left) this.cube.velocity.x -= .1;
    if(this.cube.keys.right) this.cube.velocity.x += .1;

    this.cube.update(this.ground);

    this.enemies.children.forEach(el => {
      if(el.position.y < -10) this.enemies.remove(el)
      el?.update(this.ground)

      if(this.cube.checkCollusion(this.cube, el)) {
        cancelAnimationFrame(this.animationId)
      }
    })


    this.stats.end();
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

