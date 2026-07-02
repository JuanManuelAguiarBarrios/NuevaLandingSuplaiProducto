'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Campo de partículas ambiente del hero — deriva lenta + parallax sutil al mouse.
 * Se carga lazy (next/dynamic ssr:false) y sólo se monta en desktop capaz, después
 * del idle, para no competir con el LCP del headline. `frameloop` se apaga cuando
 * el hero sale de viewport (no gasta GPU scrolleado abajo).
 */

const PARTICLE_COUNT = 260

/** PRNG determinístico (puro): mismas posiciones en cada render, sin Math.random. */
function seeded(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (seeded(i * 3 + 1) - 0.5) * 11
      arr[i * 3 + 1] = (seeded(i * 3 + 2) - 0.5) * 6.5
      arr[i * 3 + 2] = (seeded(i * 3 + 3) - 0.5) * 6
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    const group = ref.current
    if (!group) return
    // Deriva continua.
    group.rotation.y += delta * 0.03
    // Parallax: sigue el puntero con lerp suave, amplitud chica (nada mareante).
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, state.pointer.y * 0.12, 0.04)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, state.pointer.x * 0.04, 0.04)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#60A5FA"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? 'always' : 'never'}
    >
      <Particles />
    </Canvas>
  )
}
