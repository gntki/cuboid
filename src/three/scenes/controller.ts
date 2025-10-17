import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Box} from "three/geometry/box.ts";
import {characterSettings, enemySettings, groundSettings} from "@constants/settings.ts";
import {enemySpanSpeed} from "utils/enemySpanSpeed.ts";
import {ModelController} from "three/controllers/modelController.ts";
import {Runner} from "three/geometry/runner.ts";
import {Ground} from "three/geometry/ground.ts";
import {Enemy} from "three/geometry/enemy.ts";
import {checkCollusion} from "utils/checkCollusion.ts";


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

  runner: Runner;
  ground: Ground;
  runnerModelController: ModelController;
  enemyModelController: ModelController;
  enemies: THREE.Group = new THREE.Group;
  texture


  constructor(el: HTMLCanvasElement, size) {
    this.el = el;
    this.size.w = size.w;
    this.size.h = size.h;
    this.scene = new THREE.Scene();

    this.tick = this.tick.bind(this);

    this.init();
  }


  async init() {
    // this.createAxesHelper();
    await this.createModels();
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

  async createModels() {
    this.runnerModelController = await ModelController.create('src/models/luoli/scene.gltf', true);
    this.enemyModelController = await ModelController.create('src/models/stone/scene.gltf', true);
  }

  createObjects() {
    this.runner = new Runner({...characterSettings, modelController: this.runnerModelController});
    this.texture = new THREE.TextureLoader().load('src/assets/s2-texture.jpg');
    this.ground = new Ground({...groundSettings, texture: this.texture});

    this.scene.add(this.ground);
    this.scene.add(this.runner);
    this.scene.add(this.enemies);
  }

  createLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, .8);
    const dirLight = new THREE.DirectionalLight(0xffffff, .9);
    dirLight.position.set(0, 5, 15 );
    dirLight.target.position.set(0, 4, -10)
    dirLight.castShadow = true;

    this.scene.add(ambientLight);
    // const shadowHelper = new THREE.CameraHelper(dirLight.shadow.camera);
    // this.scene.add(shadowHelper);
    this.scene.add(dirLight);
    this.scene.add(dirLight.target);
  }


  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.size.w / this.size.h);
    this.camera.position.set(0, 3, 6);
    this.scene.add(this.camera);
  }


  createRender() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.el, alpha: true, antialias: true});
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

  enemySpawn(id) {
    const mn = enemySpanSpeed(id)

    if (this.animationId % mn === 0) {
      this.enemies.add(
        new Enemy({
          ...enemySettings,
          position: {
            ...enemySettings.position,
            x: Math.random() * (-4.5 - 4.5) + 4.5
          },
          modelController: this.enemyModelController,
        })
      )
    }
  }

  sceneUpdate() {
    const delta = this.clock.getDelta();
    const _delta = delta * 42;

    this.orbitControls.update();

    this.enemySpawn(this.animationId)

    this.runner.update(this.ground, _delta);
    this.runnerModelController.updateMixer(delta)
    this.ground.update(_delta)

    this.enemies.children.forEach(el => {
      if (el.position.y < -10) this.enemies.remove(el)
      el?.update(this.ground, _delta)

      if (checkCollusion(this.runner, el)) {
        cancelAnimationFrame(this.animationId)
      }
    })
  }

  tick() {
    this.animationId = requestAnimationFrame(this.tick);
    this.renderer.render(this.scene, this.camera);

    this.stats.begin();

    this.sceneUpdate()

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

