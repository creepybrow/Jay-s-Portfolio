import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei'; // Ensure this is imported

const CrazyBall = ({ position = [0, 1, 2], logoUrl }) => {
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
      meshRef.current.position.y = Math.sin(time + position[2]) * 16 + position[2];
      meshRef.current.position.x = -20, Math.cos(time + position[0] * 10 - position[0]);
      meshRef.current.position.z = Math.sin(time + position[1]) * 15 + position[0];
    }
  });

  // Handle click event
  const handleClick = () => {
    setShowInfo(prev => !prev);
  };

  return (
    <>
      <mesh ref={meshRef} position={position} onClick={handleClick}>
        <sphereGeometry args={[2, 25, 32]} />
        <meshStandardMaterial 
        attach="material"
        roughness={0.8}
        metalness={1.1} 
        map={texture}
        color="red"
        opacity={1}/>
        
      </mesh>
      {showInfo && (
        <Html position={[position[0], position[1] + 5, position[2] +1]}>
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 10]} />
      <FloatingLogo position={[2,5, 0]} logoUrl={logoUrl} />
    </Canvas>
  );
};
export default CrazyBall;