import { Html } from '@react-three/drei';
import React, { useRef, useEffect, useState } from 'react';
import { TextureLoader } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Navbar from '../sections/Navbar';

const Companion = ({ position = [1, 5, 1], logoUrl }) => {
  const meshRef = useRef();
  const [showNav, setShowNav] = useState(false);
  const [texture, setTexture] = useState(null);
  const { camera, gl } = useThree();
  const [mouse, setMouse] = useState([0,0]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse([event.clientX, event.clientY]);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const time = Date.now() * 0.008;

    

    //follow mouse cursor
    const [mouseX, mouseY] = mouse;
    const targetX = (mouseX / window.innerWidth) * 8;
    const targetY = (mouseY / window.innerHeight) * 8;
    
    //Floating effect
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.5);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.5);
  });

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
      const time = Date.now() * 0.01;
      const radius = 2; // Radius of the circular path
      const speed = 1;
      const offset = 4;

      // meshRef.current.position.x = Math.cos(time * speed) * (radius - offset) + position[0]; // Float up and down
      // meshRef.current.position.y = Math.cos(time + position[0]) * radius + position[1];
    }
  });

  // Handle mesh click (toggle navigation menu visibility)
  const handleMeshClick = () => {
    console.log("Mesh Clicked");
    setShowNav(prevShowNav => !prevShowNav); // Toggle visibility
  };

  return (
    <>
      <mesh ref={meshRef} position={position} onClick={() => setShowNav(false)}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshPhysicalMaterial
          attach="material"
          roughness={0.4}
          metalness={2.5}
          map={texture}
          color="blue"
          opacity={1}
          transparent
        />
        {showNav && (
          <Html position={[position[0] + 1, position[1] + 2, position[2]]}>
            <Navbar/>
          </Html>
        )}
        {!showNav && (
          <Html position={[position[0], position[1] + 0, position[2]]}>
            <button className="text-white" onClick={() => setShowNav(true)}>Click to Navigate</button>
          </Html>
        )}
      </mesh>
    </>
  );
};

export default Companion;
