import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei'; // Ensure this is imported
import ElectricCurrent from './ElectricCurrent';

const Ball = ({ position = [5, 5, 2], logoUrl }) => {
  const meshRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const [texture, setTexture] = useState(null);

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
      const centerX = window.innerWidth/2;
      const centerY = window.innerHeight/2;
      const scale = 10 + Math.sin(time)* 1;

      const colorValue = Math.abs(Math.sin(time));
      meshRef.current.material.color.setRGB(0.01 + 0.1 * colorValue, 0.1, 0.1);
    }
  });

  // Handle click event
  const handleClick = () => {
    setShowInfo(prev => !prev);
  };

  return (
    <>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial 
        attach="material"
        roughness={0.7}
        metalness={0.9} 
        map={texture}
        color="black"
        opacity={1}/>
        <ElectricCurrent/>
        
      </mesh>
      {showInfo && (
        <Html position={[position[1] -5, position[1] + -5, position[2] +1]}>
          <div style={{
            color: 'white', // Brighter text
            background: 'rgba(0, 0, 255, 0.7)', // Darker background
            padding: '10px',
            borderRadius: '20px'
          }}>
            <h3>About Me</h3>
            <p>Currently learning: React, Three.js, and more!</p>
          </div>
        </Html>
      )}
    </>
  );
};

// Main App component remains unchanged
const App = () => {
  const logoUrl = 'path_to_your_logo_image.png'; // Replace with your logo path

  return (
    <Canvas style={{ height: '100vh', background: 'black' }} camera={{ position: [20, 2, 10], fov: 75 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 1, 10]} />
      <FloatingLogo position={[5, 5, 0]} logoUrl={logoUrl} />
    </Canvas>
  );
};
export default Ball;