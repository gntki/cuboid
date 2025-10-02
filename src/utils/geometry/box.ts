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

    this.top = this.position.y + this.height/2;
    this.bottom = this.position.y - this.height/2;

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


  update(ground) {
    this.top = this.position.y + this.height/2;
    this.bottom = this.position.y - this.height/2;

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.applyGravity(ground);
  }

  applyGravity(ground) {
    this.velocity.y += this.gravity;

    if(this.bottom + this.velocity.y <= ground.top) {
      this.velocity.y *= .8;
      this.velocity.y = - this.velocity.y
    } else this.position.y += this.velocity.y
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
