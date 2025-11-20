import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SC6000M() {
  const groupRef = useRef<THREE.Group>(null)

  // Materials
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.3,
    roughness: 0.4,
  })

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: '#888888',
    metalness: 0.9,
    roughness: 0.1,
  })

  const screenMat = new THREE.MeshStandardMaterial({
    color: '#000000',
    metalness: 0.8,
    roughness: 0.2,
    emissive: '#0088ff',
    emissiveIntensity: 0.3,
  })

  const jogWheelMat = new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    metalness: 0.7,
    roughness: 0.3,
  })

  const buttonMat = new THREE.MeshStandardMaterial({
    color: '#333333',
    metalness: 0.4,
    roughness: 0.5,
  })

  const ledOffMat = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.2,
    roughness: 0.8,
  })

  const ledRedMat = new THREE.MeshStandardMaterial({
    color: '#ff0000',
    emissive: '#ff0000',
    emissiveIntensity: 0.5,
    metalness: 0.1,
    roughness: 0.3,
  })

  const ledBlueMat = new THREE.MeshStandardMaterial({
    color: '#0088ff',
    emissive: '#0088ff',
    emissiveIntensity: 0.5,
    metalness: 0.1,
    roughness: 0.3,
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.4, 4]} />
        <primitive object={blackPlasticMat} attach="material" />
      </mesh>

      {/* Top plate */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[5.8, 0.1, 3.8]} />
        <primitive object={aluminumMat} attach="material" />
      </mesh>

      {/* Large touchscreen display */}
      <mesh position={[-1.2, 0.31, 0.3]} castShadow>
        <boxGeometry args={[2.2, 0.02, 1.8]} />
        <primitive object={screenMat} attach="material" />
      </mesh>

      {/* Screen border */}
      <mesh position={[-1.2, 0.32, 0.3]} castShadow>
        <boxGeometry args={[2.3, 0.01, 1.9]} />
        <primitive object={blackPlasticMat} attach="material" />
      </mesh>

      {/* Jog wheel */}
      <mesh position={[1.8, 0.35, 0]} castShadow receiveShadow rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.15, 64]} />
        <primitive object={jogWheelMat} attach="material" />
      </mesh>

      {/* Jog wheel center display */}
      <mesh position={[1.8, 0.43, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.02, 64]} />
        <primitive object={screenMat} attach="material" />
      </mesh>

      {/* Jog wheel ring markers */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i / 32) * Math.PI * 2
        const x = 1.8 + Math.cos(angle) * 0.95
        const z = Math.sin(angle) * 0.95
        return (
          <mesh key={i} position={[x, 0.43, z]} castShadow>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <primitive object={ledOffMat} attach="material" />
          </mesh>
        )
      })}

      {/* Performance pads (8 pads in 2 rows) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const row = Math.floor(i / 4)
        const col = i % 4
        return (
          <group key={i}>
            <mesh
              position={[-1.8 + col * 0.45, 0.32, -1.2 + row * 0.45]}
              castShadow
            >
              <boxGeometry args={[0.38, 0.04, 0.38]} />
              <primitive object={buttonMat} attach="material" />
            </mesh>
            {/* LED indicator on pad */}
            <mesh
              position={[-1.8 + col * 0.45, 0.35, -1.2 + row * 0.45]}
              castShadow
            >
              <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
              <primitive object={i % 2 === 0 ? ledRedMat : ledBlueMat} attach="material" />
            </mesh>
          </group>
        )
      })}

      {/* Track skip buttons */}
      <mesh position={[0.5, 0.32, -1.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 32]} />
        <primitive object={buttonMat} attach="material" />
      </mesh>
      <mesh position={[0.8, 0.32, -1.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 32]} />
        <primitive object={buttonMat} attach="material" />
      </mesh>

      {/* Play/Pause button (larger) */}
      <mesh position={[1.1, 0.32, -1.5]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
        <primitive object={ledBlueMat} attach="material" />
      </mesh>

      {/* Cue button */}
      <mesh position={[1.45, 0.32, -1.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 32]} />
        <primitive object={ledRedMat} attach="material" />
      </mesh>

      {/* Tempo fader */}
      <mesh position={[0.2, 0.32, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.03, 1.2]} />
        <primitive object={aluminumMat} attach="material" />
      </mesh>
      <mesh position={[0.2, 0.35, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.05, 0.15]} />
        <primitive object={buttonMat} attach="material" />
      </mesh>

      {/* FX knobs/buttons on right side */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={i}>
          {/* Knob */}
          <mesh position={[2.3, 0.35, -1.2 + i * 0.4]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
            <primitive object={blackPlasticMat} attach="material" />
          </mesh>
          {/* Knob indicator line */}
          <mesh position={[2.3, 0.39, -1.2 + i * 0.4]} castShadow>
            <boxGeometry args={[0.02, 0.01, 0.08]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Small info display */}
      <mesh position={[0.8, 0.31, 1.2]} castShadow>
        <boxGeometry args={[1.5, 0.02, 0.4]} />
        <primitive object={screenMat} attach="material" />
      </mesh>

      {/* Function buttons row */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[-1.5 + i * 0.35, 0.32, 1.5]}
          castShadow
        >
          <boxGeometry args={[0.28, 0.03, 0.18]} />
          <primitive object={buttonMat} attach="material" />
        </mesh>
      ))}

      {/* USB/SD slots on left */}
      <mesh position={[-2.7, 0.25, 1.2]} castShadow>
        <boxGeometry args={[0.15, 0.15, 0.6]} />
        <primitive object={blackPlasticMat} attach="material" />
      </mesh>

      {/* Ambient lighting */}
      <pointLight position={[1.8, 0.5, 0]} intensity={0.3} color="#0088ff" distance={2} />
      <pointLight position={[-1.2, 0.4, 0.3]} intensity={0.2} color="#0088ff" distance={2} />
    </group>
  )
}
