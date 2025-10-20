import * as THREE from 'three';
import {SizesTypes, XYZType} from "@constants/settings.ts";

export interface BoxProps {
  geometry: THREE.BoxGeometry
  material: THREE.MeshStandardMaterial
  sizes: SizesTypes
  color: number
  position: XYZType
  velocity: XYZType
}