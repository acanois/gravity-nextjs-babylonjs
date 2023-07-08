import {
    Scene,
    Vector3,
    MeshBuilder,
    StandardMaterial,
    Color3,
    Mesh,
  } from '@babylonjs/core'
  
  import { MovingBody } from './movingBody'
  
  export class Attractor {
    position: Vector3
    mass: number
    mesh: Mesh
    scene: Scene
  
    constructor(position: Vector3, mass: number, scene: Scene) {
      this.position = position
      this.mass = mass
      this.scene = scene
      this.mesh = this.createMesh()
    }
  
    setMag(inputVector: Vector3, targetMag: number) {
      const currentMag = inputVector.length()
      const x = inputVector.x * (targetMag / currentMag)
      const y = inputVector.y * (targetMag / currentMag)
      const z = inputVector.z * (targetMag / currentMag)
  
      return new Vector3(x, y, z)
    }
  
    attract(body: MovingBody): Vector3 {
      const G = 0.01
      const force = this.position.subtract(body.position)
      const gravity = (G * this.mass * body.mass) / (force.lengthSquared())
      
      return this.setMag(force, gravity)
    }
   
    createMesh(): Mesh {
      const sphere = MeshBuilder.CreateSphere(
        'mover',
        {
          diameter: this.mass,
        },
        this.scene
      )
      sphere.position = this.position
      const sphereMaterial: StandardMaterial = new StandardMaterial(
        'moverMaterial',
        this.scene
      )
      sphereMaterial.diffuseColor = new Color3(1, 0.3, 0.3)
      sphere.material = sphereMaterial
  
      return sphere
    }
  }
  