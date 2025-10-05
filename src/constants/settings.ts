export const characterSettings = {
  width: 1,
  height: 1,
  depth: 1,
  color: 0x00ff00,
  position: {x: 0, y: 3, z: 0},
  velocity: {x: 0, y: -.1, z: 0}
}

export const groundSettings = {
  width: 5,
  height: .5,
  depth: 10,
  color: 0x0000ff,
  position: {x: 0, y: 0, z: 0},
  velocity: {x: 0, y: 0, z: 0}
}

export const enemySettings = {
  width: 1,
  height: 1,
  depth: 1,
  color: 0xff0000,
  position: {x: 0, y: 3, z: -5},
  velocity: {x: 0, y: 0, z: .05},
  zAcceleration: true
}