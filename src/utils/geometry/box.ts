import * as THREE from 'three'

export class Box extends THREE.Mesh {
  //main
  width: number;
  height: number;
  depth: number;
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

  constructor(width, height, depth, color = 0x00ff00, position, velocity) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({color: color})
    );

    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;

    this.castShadow = true;
    this.receiveShadow = true;

    this.initPosition(position);
    this.initVelocity(velocity);
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

  updateSides() {
    this.top = this.position.y + this.height/2;
    this.bottom = this.position.y - this.height/2;

    this.left = this.position.x - this.width/2;
    this.right = this.position.x + this.width/2;

    this.front = this.position.z - this.depth/2;
    this.back = this.position.z + this.depth/2;
  }


  update(ground) {
    this.updateSides();

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    // console.log('ff', this.front)
    // console.log(this.back)

    if (this.right >= ground.left && this.left <= ground.right) {
      console.log('collusion x')
    }
    if (this.front <= ground.back && this.back >= ground.front) {
      console.log('collusion z')
    }
    if(this.bottom + this.velocity.y <= ground.top) {
      console.log('collusion y')
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
