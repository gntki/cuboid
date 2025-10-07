import * as THREE from 'three'

export class Box extends THREE.Mesh {
  //main
  sizes;
  color: number
  //sides
  top: number;
  bottom: number;
  left: number;
  right: number;
  front: number
  back: number
  //settings
  velocity = {x: 0, y: 0, z: 0}
  gravity: number = -0.01;
  keys = {
    forward: false,
    back: false,
    left: false,
    right: false,
    jump: false
  }

  isRunner: boolean = false;
  innerModel
  animations

  constructor({sizes, color = 0x00ff00, position, velocity, isRunner = false, model = null, modelScale = null}) {
    super(
      new THREE.BoxGeometry(sizes.width, sizes.height, sizes.depth),
      new THREE.MeshStandardMaterial({color: color, visible: true, wireframe: true})
    );

    this.sizes = sizes;
    this.color = color;
    this.isRunner = isRunner


    this.initPosition(position);
    this.initVelocity(velocity);

    if(model) {
      this.addModel(model, modelScale);
    }

    this.updateSides();

    this.update = this.update.bind(this);
    this.addListeners();
  }



  initPosition(position) {
    const {x, y, z} = position;
    this.position.set(x, y, z)
  }

  initVelocity(velocity) {
    const {x, y, z} = velocity;
    this.velocity.x = x;
    this.velocity.y = y;
    this.velocity.z = z;
  }

  addModel(model, modelScale) {
    if(!model) return;
    this.innerModel = this.isRunner ? model.model :  model.model.clone();
    this.animations = model.animations
    const {x,y,z} = modelScale;
    this.innerModel.scale.set(x, y, z);
    this.innerModel.position.y = this.isRunner ? -.5 : 0;
    this.innerModel.rotation.y = Math.PI;
    this.add(this.innerModel);

  }


  updateSides() {
    const {x, y, z} = this.position;
    const {width, height, depth} = this.sizes;

    this.top = y + height/2;
    this.bottom = y - height/2;

    this.left = x - width/2;
    this.right = x + width/2;

    this.front = z - depth/2;
    this.back = z + depth/2;
  }


  update(ground) {
    this.updateSides();

    if(!this.isRunner) {
      this.velocity.z += .001;
    }

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    if(this.innerModel && !this.isRunner) {
      this.innerModel.rotation.x += this.velocity.z;
    }
    this.applyGravity(ground);
  }

  applyGravity(ground) {
    this.velocity.y += this.gravity;

    if(this.checkCollusion(this, ground)) {
      this.velocity.y *= .8;
      this.velocity.y = - this.velocity.y
    } else this.position.y += this.velocity.y
  }

  checkCollusion(box1, box2) {
    const collusiontX = box1.right >= box2.left && box1.left <= box2.right;
    const collusiontZ = box1.front <= box2.back && box1.back >= box2.front;
    const collusiontY = box1.bottom + box1.velocity.y <= box2.top;

    return collusiontX && collusiontZ && collusiontY

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

  addListeners() {
    window.addEventListener("keydown", e => {
      this.keyCodeHandler(e.code, true)
    })

    window.addEventListener("keyup", e => {
      this.keyCodeHandler(e.code, false)
    })
  }
}
