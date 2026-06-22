import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const TARGET = new THREE.Vector3(0, 3, 0)

function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // Posição base com parallax suave do mouse
    const baseX = mouse.current.x * 1.8
    const baseY = 5 - mouse.current.y * 1.2
    const baseZ = 10 + Math.sin(t * 0.08) * 0.5

    camera.position.x += (baseX - camera.position.x) * 0.04
    camera.position.y += (baseY - camera.position.y) * 0.04
    camera.position.z += (baseZ - camera.position.z) * 0.04

    camera.lookAt(TARGET)
  })

  return null
}

export default CameraRig
