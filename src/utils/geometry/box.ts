import * as THREE from 'three'

export class Box extends THREE.Mesh {
  width: number;
  height: number;
  depth: number;
  color: number
  top: number;
  bottom: number;
  velocity = {
    x: 0,
    y: 0,
    z: 0
  }
  gravity: number = -0.01;

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

    this.setPosition(position)
    this.setVelocity(velocity)

    this.top = this.position.y + this.height/2;
    this.bottom = this.position.y - this.height/2;

    this.update = this.update.bind(this)
  }

  setPosition(position) {
    const {x, y, z} = position;
    this.position.set(x, y, z)
  }

  setVelocity(velocity) {
    const {x, y, z} = velocity;
    this.velocity.x = x;
    this.velocity.y = y;
    this.velocity.z = z;
  }


  update(ground) {
    this.top = this.position.y + this.height/2;
    this.bottom = this.position.y - this.height/2;

    this.applyGravity(ground);
  }

  applyGravity(ground) {
    this.velocity.y += this.gravity;

    if(this.bottom + this.velocity.y <= ground.top) {
      this.velocity.y *= .8;
      this.velocity.y = - this.velocity.y
    } else this.position.y += this.velocity.y
  }
}
