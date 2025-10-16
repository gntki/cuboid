export const characterSettings = {
  sizes: {
    width: .4,
    height: 1,
    depth: .5,
  },
  color: 0x00ff00,
  position: {x: 0, y: 0.55, z: 3},
  velocity: {x: 0, y: 0, z: 0},
  modelScale: {x: .007, y: .007, z: .007},
  role: 'runner'
}

export const groundSettings = {
  sizes: {
    width: 10,
    height: .1,
    depth: 50
  },
  color: 0xa300ff,
  position: {x: 0, y: 0, z: -20},
  velocity: {x: 0, y: 0, z: 0},
  role: 'ground'
}

export const enemySettings = {
  sizes: {
    width: 1.5,
    height: 1.5,
    depth: 1.5
  },
  color: 0xff0000,
  position: {x: 0, y: 3, z: -35},
  velocity: {x: 0, y: 0, z: .05},
  modelScale: {x: .8, y: .8, z: .8},
  role: 'enemy'
}