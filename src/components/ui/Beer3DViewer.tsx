"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

interface BeerCanProps {
  modelPath?: string;
  autoRotate?: boolean;
}

function BeerCan({ autoRotate = true }: BeerCanProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Placeholder cylinder when no 3D model is provided
  return (
    <Center>
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
        <meshStandardMaterial
          color="#56a899"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Center>
  );
}

function BeerCanModel({ modelPath, autoRotate = true }: BeerCanProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath!);

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Center>
      <group ref={meshRef}>
        <primitive object={scene} scale={1} />
      </group>
    </Center>
  );
}

interface Beer3DViewerProps {
  modelPath?: string;
  className?: string;
}

export default function Beer3DViewer({ modelPath, className = "" }: Beer3DViewerProps) {
  return (
    <div className={`w-full aspect-square ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight
          position={[-10, 10, 5]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
        />

        <Suspense fallback={null}>
          {modelPath ? (
            <BeerCanModel modelPath={modelPath} />
          ) : (
            <BeerCan />
          )}
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
