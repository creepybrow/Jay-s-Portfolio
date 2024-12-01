import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei'; // Ensure this is imported
import FloatingBubble from './Bubble';

const ElectricCurrent = () => {
  const points = [];
  const count = 100;//Number of points in your electric current

  for(let i= 0; i <count; i++){
    const x = Math.sin(i*0.2)*5;//Adjust for your desired movement
    const y = Math.cos(i*0.3)*5;
    points.push(new THREE.Vector3(x,y,0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({color:0x00ffcc});

  return(
    <line geometry={geometry} material={material}/>
  );
};

const ElectricSphere = ({ position = [0, 1, 2], logoUrl }) => {
  const meshRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const [texture, setTexture] = useState(null);
  const [isShocking, setIsShocking] = useState(false);

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
      meshRef.current.position.y = Math.sin(time + position[0]) * 7 - position[2];
      meshRef.current.position.x = -9;
      meshRef.current.position.z = Math.sin(time + position[1]) * 8 + position[1];

      //Check distance to the larger orb
      const distance = meshRef.current.position.distanceTo(new THREE.Vector3(FloatingBubble[0], FloatingBubble[1], FloatingBubble[2]));
      if(distance < 5){// adjust the threshold as needed
        setIsShocking(true);
      }else{
        setIsShocking(false);
      }
    }
  });

  // Handle click event
  const handleClick = () => {
    setShowInfo(prev => !prev);
  };

  return (
    <>
      <mesh ref={meshRef} position={position} onClick={handleClick}>
        <sphereGeometry args={[1, 24, 32]} />
        <meshStandardMaterial 
        attach="material"
        roughness={0.5}
        metalness={0.5} 
        map={texture}
        color="red"
        opacity={0.4}/>
        
      </mesh>
      {showInfo && (
        <Html position={[position[0], position[1] + 5, position[2] +1]}>
          <div style={{
            color: 'red', // Brighter text
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
      <FloatingLogo position={[5, 1, 0]} logoUrl={logoUrl} largeOrbPosition={[0,0,0]}/>
    </Canvas>
  );
};
export default ElectricSphere;