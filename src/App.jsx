import { Suspense, useState } from 'react'
import './App.css'
import Model from './components/Model'
import {Canvas} from "@react-three/fiber"

function App() {

  return (

      <Suspense fallback={<p>Loading...</p>}>
        <Canvas shadows>
          <Model />
        </Canvas>
      </Suspense>
  )
}

export default App
