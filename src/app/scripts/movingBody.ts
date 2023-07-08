import {
    Scene,
    Vector3,
    Mesh,
    MeshBuilder,
    StandardMaterial,
    Color3,
  } from '@babylonjs/core'
  
  export class MovingBody {
    position: Vector3
    velocity: Vector3
    acceleration: Vector3
    mass: number
    radius: number
    mesh: Mesh
    scene: Scene
  
    constructor(
      position: Vector3,
      velocity: Vector3,
      acceleration: Vector3,
      mass: number,
      radius: number,
      scene: Scene,
    ) {
      this.position = position
      this.velocity = velocity
      this.acceleration = acceleration
      this.mass = mass
      this.radius = radius
      this.scene = scene
      this.mesh = this.createMesh()
    }
  
    applyForce(force: Vector3) {
      const f = force.scale(1 / this.mass)
      this.acceleration = this.acceleration.add(f)
    }
  
    update() {
      this.velocity.addInPlace(this.acceleration)
      this.position.addInPlace(this.velocity)
      this.acceleration.multiplyInPlace(Vector3.Zero())
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
      sphereMaterial.diffuseColor = new Color3(0.3, 0.3, 1)
      sphere.material = sphereMaterial
  
      return sphere
    }
  }
  