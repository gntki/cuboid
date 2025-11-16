import * as THREE from 'three'
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {characterSettings, enemySettings, groundSettings} from "@constants/settings.ts";
import {enemySpanSpeed} from "utils/enemySpanSpeed.ts";
import {ModelController} from "three/controllers/modelController.ts";
import {Runner} from "three/geometry/runner.ts";
import {Ground} from "three/geometry/ground.ts";
import {Enemy} from "three/geometry/enemy.ts";
import {checkCollusion} from "utils/checkCollusion.ts";
import {ResizeController} from "three/controllers/resizeController/resizeController.ts";

const baseurl = import.meta.env.BASE_URL;

export class Controller {
  private animationId: number = 0;
  private frameId: number = 0;

  private isGameStart: boolean = false;
  private stopGame: () => void;

  private el: HTMLCanvasElement;
  private size: { w: number, h: number } = {w: 0, h: 0};
  private scene: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private orbitControls: OrbitControls;

  private clock: THREE.Clock = new THREE.Clock();
  private stats: Stats = new Stats();
  private resizeController: ResizeController;

  private runner!: Runner;
  private ground!: Ground;
  private runnerModelController!: ModelController;
  private enemyModelController!: ModelController;
  private enemies: THREE.Group = new THREE.Group;
  private texture: THREE.Texture | null = null;


  constructor(el: HTMLCanvasElement, stopGame: () => void, size: { w: number, h: number }) {
    this.el = el;
    this.stopGame = stopGame;
    this.size.w = size.w;
    this.size.h = size.h;
    this.scene = new THREE.Scene();

    this.startGame = this.startGame.bind(this);
    this.tick = this.tick.bind(this);
    this.destroy = this.destroy.bind(this);

    this.init();
  }


  async init() {
    // this.createAxesHelper();
    await this.createModels();
    await this.createObjects();

    this.createLights();
    this.createCamera();
    this.createRender();
    this.createStats();

    this.setControls();

    this.tick();

    this.resizeController = new ResizeController({...this})
  }


  createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(7);
    this.scene.add(axesHelper);
  }

  async createModels() {
    this.runnerModelController = await ModelController.create(baseurl + 'models/luoli/scene.gltf', true);
    this.enemyModelController = await ModelController.create(baseurl + 'models/stone/scene.gltf', true);
  }

  async createObjects() {
    this.runner = new Runner({...characterSettings, modelController: this.runnerModelController});
    try {
      this.texture = await new Promise((resolve, reject) => {
        new THREE.TextureLoader().load(`${baseurl}textures/s2-texture.jpg`, resolve, undefined, reject);
      });
    } catch (e) {
      this.texture = null;
    }
    this.ground = new Ground({...groundSettings, texture: this.texture});

    this.scene.add(this.ground);
    this.scene.add(this.runner);
    this.scene.add(this.enemies);
  }

  createLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, .8);
    const dirLight = new THREE.DirectionalLight(0xffffff, .9);
    dirLight.position.set(0, 10, 5);
    dirLight.target.position.set(0, 0,-30)
    dirLight.castShadow = true;

    dirLight.shadow.camera.left = -5;
    dirLight.shadow.camera.right = 5;
    dirLight.shadow.camera.top = 5;
    dirLight.shadow.camera.bottom = -10;

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
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom)
  }


  setControls() {
    //orbitControls
    this.orbitControls = new OrbitControls(this.camera, this.el);
    this.orbitControls.enableDamping = true;
  }

  enemySpawn(id: number) {
    if (!this.isGameStart) return;

    const mn = enemySpanSpeed(id)

    if (id % mn === 0) {
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
    let delta = this.clock.getDelta();
    //Ограничение дельты в случае потери фокуса
    delta = Math.min(delta, 1/30);
    const _delta = delta * 42;

    this.orbitControls.update();

    this.enemySpawn(this.frameId)

    this.runner.update(this.ground, _delta);
    this.runnerModelController.updateMixer(delta)
    this.ground.update(_delta)

    this.enemies.children.forEach(el => {
      if (el.position.y < -10) this.enemies.remove(el)
      const enemy = el as Enemy;
      enemy?.update(this.ground, _delta)

      if (checkCollusion(this.runner, enemy)) {
        this.isGameStart = false;
        this.stopGame();
      }
    })
  }

  tick() {
    if (!this.renderer) return;

    this.renderer.render(this.scene, this.camera);

    this.stats.begin();
    this.sceneUpdate()
    this.stats.end();

    if (this.isGameStart) {
      this.frameId++;
      this.animationId = requestAnimationFrame(this.tick);
    }
  }

  startGame() {
    console.log("___START_GAME___")
    this.isGameStart = true;
    this.animationId = requestAnimationFrame(this.tick);
  }

  destroy() {
    console.log('___DESTROY___')
    cancelAnimationFrame(this.animationId)
    this.frameId = 0;
    this.enemies.clear();
    this.resizeController.removeResizeListener();
    this.renderer.dispose();
  }



}

