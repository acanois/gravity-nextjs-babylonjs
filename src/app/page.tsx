'use client'

import BabylonScene from './components/BabylonScene'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="z-0 w-full items-center justify-between">
        <BabylonScene></BabylonScene>
      </div>
    </main>
  )
}
