import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveformMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(6, 20)
    return geo
  }, [])

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#00D4FF',
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })
  }, [])

  // Store original positions
  const originalPositions = useMemo(() => {
    const pos = geometry.attributes.position
    const arr = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count * 3; i++) {
      arr[i] = pos.array[i]
    }
    return arr
  }, [geometry])

  useFrame(({ clock, pointer }) => {
    const mesh = meshRef.current
    if (!mesh) return

    // Update mouse ref with lerp
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.05

    // Target rotation based on mouse
    const targetRotY = mouseRef.current.x * 0.3
    const targetRotX = -mouseRef.current.y * 0.3

    // Smooth interpolation
    rotationRef.current.x += (targetRotX - rotationRef.current.x) * 0.05
    rotationRef.current.y += (targetRotY - rotationRef.current.y) * 0.05

    mesh.rotation.x = rotationRef.current.x + clock.elapsedTime * 0.0005
    mesh.rotation.y = rotationRef.current.y + clock.elapsedTime * 0.001

    // Vertex displacement
    const posAttr = geometry.attributes.position
    const time = clock.elapsedTime
    const frequency = 1.5
    const amplitude = 0.4
    const displacement = 0.6
    const radius = 6

    for (let i = 0; i < posAttr.count; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      if (len === 0) continue

      const nx = ox / len
      const ny = oy / len
      const nz = oz / len

      const wave =
        Math.sin(time * frequency + ox * amplitude) * displacement

      const newRadius = radius + wave

      posAttr.array[i * 3] = nx * newRadius
      posAttr.array[i * 3 + 1] = ny * newRadius
      posAttr.array[i * 3 + 2] = nz * newRadius
    }

    posAttr.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  )
}

export default function EnergyWaveform() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <WaveformMesh />
      </Canvas>
    </div>
  )
}
