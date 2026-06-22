import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GOLD   = new THREE.Color('#B8965A')
const DARK   = new THREE.Color('#111827')
const GLASS  = new THREE.Color('#1e3a5f')

interface Block {
  y: number
  scaleX: number
  scaleZ: number
  offsetX: number
  offsetZ: number
  isGold: boolean
  isGlass: boolean
}

function Tower() {
  const groupRef = useRef<THREE.Group>(null)

  const blocks = useMemo<Block[]>(() => {
    const arr: Block[] = []
    const floors = 28

    for (let i = 0; i < floors; i++) {
      const t = i / floors
      arr.push({
        y: i * 0.48,
        scaleX: 1.4 - t * 0.35 + (Math.random() - 0.5) * 0.08,
        scaleZ: 0.9 - t * 0.2  + (Math.random() - 0.5) * 0.06,
        offsetX: (Math.random() - 0.5) * 0.12,
        offsetZ: (Math.random() - 0.5) * 0.08,
        isGold:  i % 7 === 0,
        isGlass: i % 3 === 1,
      })
    }
    return arr
  }, [])

  // Leve rotação automática
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.18
  })

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.offsetX, b.y, b.offsetZ]} castShadow>
          <boxGeometry args={[b.scaleX, 0.42, b.scaleZ]} />
          <meshStandardMaterial
            color={b.isGold ? GOLD : b.isGlass ? GLASS : DARK}
            metalness={b.isGold ? 0.9 : b.isGlass ? 0.4 : 0.6}
            roughness={b.isGold ? 0.15 : b.isGlass ? 0.05 : 0.4}
            envMapIntensity={1.2}
          />
        </mesh>
      ))}

      {/* Base plataforma */}
      <mesh position={[0, -0.28, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.12, 1.5]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

export default Tower
