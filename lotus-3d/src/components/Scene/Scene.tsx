import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Tower from './Tower'
import Particles from './Particles'
import CameraRig from './CameraRig'

function Scene() {
  return (
    <Canvas
      camera={{ position: [4, 5, 10], fov: 42 }}
      dpr={[1, 1.5]}
      shadows
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        {/* Iluminação premium */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[6, 12, 4]}
          intensity={1.4}
          color="#B8965A"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-8, 6, -4]} intensity={0.6} color="#1e3a5f" />
        <pointLight position={[0, 16, 0]}  intensity={0.4} color="#ffffff" />

        {/* Ambiente HDRI leve */}
        <Environment preset="city" />

        <Tower />
        <Particles />
        <CameraRig />
      </Suspense>
    </Canvas>
  )
}

export default Scene
