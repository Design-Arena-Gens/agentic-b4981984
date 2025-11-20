'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { SC6000M } from './SC6000M'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <Suspense fallback={null}>
          <SC6000M />
          <Environment preset="studio" />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.5}
            scale={20}
            blur={2}
            far={4}
          />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          target={[0, 0, 0]}
        />
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        Pioneer DJ SC6000M • Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}
