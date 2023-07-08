'use client'

import React from 'react'
import {
  ArcRotateCamera,
  Vector3,
  Color4,
  HemisphericLight,
  Scene,
} from '@babylonjs/core'
import SceneComponent from 'babylonjs-hook'
import { Attractor } from '../scripts/attractor'
import { MovingBody } from '../scripts/movingBody'

let attractor: Attractor
let body: MovingBody

const onSceneReady = (scene: Scene) => {
  scene.clearColor = new Color4(0, 0, 0, 1.0)

  const canvas = scene.getEngine().getRenderingCanvas()
  canvas!.width = window.innerWidth
  canvas!.height = window.innerHeight

  const camera: ArcRotateCamera = new ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    30, // Camera distance
    Vector3.Zero(),
    scene
  )
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', new Vector3(-1, 1, 1), scene)
  light.intensity = 0.7
  const light2 = new HemisphericLight('light2', new Vector3(1, -1, -1), scene)
  light2.intensity = 0.7

  attractor = new Attractor(new Vector3(0, 0, 0), 1.0, scene)

  body = new MovingBody(
    new Vector3(3.0, 0.0, 3.0), // position
    new Vector3(-0.01, 0.05, 0.0), // velocity
    new Vector3(0.0, 0.0, 0.0), // acceleration
    0.5, // mass
    0.5, // radius
    scene
  )
}

const onRender = (scene: Scene) => {
  const force = attractor.attract(body)
  body.update()
  body.applyForce(force)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SceneComponent
          antialias
          onSceneReady={onSceneReady}
          onRender={onRender}
          id="my-canvas"
        />
      </header>
    </div>
  )
}

export default App
