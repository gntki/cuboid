import * as THREE from 'three';
import {SizesTypes, XYZType} from "@constants/settings.ts";
import {ModelController} from "three/controllers/modelController.ts";

export interface BoxProps {
  geometry: THREE.BoxGeometry
  material: THREE.MeshStandardMaterial
  sizes: SizesTypes
  color: number
  position: XYZType
  velocity: XYZType
}

export interface EnemyProps {
  sizes: SizesTypes
  color: number
  position: XYZType
  velocity: XYZType
  modelController: ModelController | null
  modelScale: XYZType | null
}