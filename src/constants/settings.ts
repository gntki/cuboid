export const characterSettings = {
  width: 1,
  height: 1,
  depth: 1,
  color: 0x00ff00,
  position: {x: 0, y: 3, z: 0},
  velocity: {x: 0, y: -.1, z: 0}
}

export const groundSettings = {
  width: 10,
  height: .1,
  depth: 50,
  color: 0x0000ff,
  position: {x: 0, y: 0, z: -20},
  velocity: {x: 0, y: 0, z: 0}
}

export const enemySettings = {
  width: 1.5,
  height: 1.5,
  depth: 1.5,
  color: 0xff0000,
  position: {x: 0, y: 3, z: -35},
  velocity: {x: 0, y: 0, z: .05},
  zAcceleration: true
}