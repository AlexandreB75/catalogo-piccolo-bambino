import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
}

function Particles({ count = 180 }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = Math.random() * 18 - 2
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.elapsedTime * 0.018
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#B8965A"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

export default Particles
