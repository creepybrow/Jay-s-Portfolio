import {Html} from '@react-three/drei';
import React, { useRef, useEffect, useState } from 'react';
import { TextureLoader } from 'three';
import {useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Companion = ({ position = [0, 1, 2, 3], logoUrl }) => {
  const meshRef = useRef();
  const [showNav, setShowNav] = useState(false);
  const [texture, setTexture] = useState(null);
  const { camera, gl } = useThree();
  const raycaster = new THREE.Raycaster();

  // Load texture once
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(logoUrl, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [logoUrl]);

  // Floating animation using useFrame
  useFrame(() => {
    if (meshRef.current) {
      const time = Date.now() * 0.001;
      const radius = 2;// Radius of the cirular path
      const speed = 1;
      const offset = 1;

      meshRef.current.position.x = 12 , Math.cos(time * speed) * (radius - offset) + position[0]; // Float up and down
      meshRef.current.position.y =  Math.sin(time + position[2]) * radius + position[0];
    }
  });

  const handleClick = () => {
    setShowNav(prev => !prev); // Toggle navigation
  };

  useEffect(() => {
    const handleMouseClick = (event) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);

      if (intersects.length > 0) {
        handleClick();
      }
    };

    gl.domElement.addEventListener('click', handleMouseClick);

    return () => {
      gl.domElement.removeEventListener('click', handleMouseClick);
    };
  }, [camera, gl]);

  return (
    <>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial 
          attach="material"
          roughness={1}
          metalness={0.5} 
          map={texture}
          color="green"
          opacity={1}
          transparent
        />
      </mesh>
      {showNav && (
        <Html position={[position[0], position[1] + 1, position[2]]}>
          {/* Your navigation UI goes here */}
        </Html>
      )}
    </>
  );
};

export default Companion;
