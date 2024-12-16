import { Html } from '@react-three/drei';
import React, { useRef, useEffect, useState } from 'react';
import { TextureLoader } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Navbar from '../sections/Navbar';

const Companion = ({ position = [5, 10, -5], logoUrl }) => {
  const meshRef = useRef();
  const eyeRef = useRef();
  const [showNav, setShowNav] = useState(false);
  const [texture, setTexture] = useState(null);
  const { camera, gl } = useThree();
  const [mouse, setMouse] = useState([0, 0]);
  const [wandering, setWandering] = useState(false); // state to control wandering behavior
  const [randomDirection, setRandomDirection] = useState(new THREE.Vector3(2, 2, 0)); // Random direction for wandering


  //Pulsing effect color
  const [colorPulse, setColorPulse] = useState(0xcccccc);//starting color

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = Math.random() * 0xffffff;
      setColorPulse(randomColor);
    }, Math.random() *500 + 500);

    return () => clearInterval(interval);
  }, []);
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse([event.clientX, event.clientY]);
      setWandering(true); // Stop wandering if mouse is moving
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Create random wandering direction
  useEffect(() => {
    if (wandering) {
      const interval = setInterval(() => {
        const randomVec = new THREE.Vector3(
          (Math.random() - 1) * 1, // Random X direction
          (Math.random() - 0.5) * 6, // Random Y direction
          2 // Fixed Z direction (towards camera)
        );
        setRandomDirection(randomVec);
      }, 500); // Update random direction every 3 seconds

      return () => clearInterval(interval);
    }
  }, [wandering]);

  useFrame(() => {
    const [mouseX, mouseY] = mouse;

    // Normalize mouse position to the range of -1 to 1
    const mouseXNormalized = (mouseX / window.innerWidth) * 2 - 1; // -1 to 1 range
    const mouseYNormalized = (mouseY / window.innerHeight) * -2 + 1; // -1 to 1 range

    // Direction vector for mouse position or wandering
    const direction = wandering
      ? randomDirection // Use random direction if wandering
      : new THREE.Vector3(mouseXNormalized, mouseYNormalized, 3); // Use mouse direction if not wandering

    direction.normalize(); // Normalize to stay within the sphere

    // Position the eye on the sphere's surface
    const sphereRadius = 1;
    if (eyeRef.current) {
      eyeRef.current.position.copy(direction.multiplyScalar(sphereRadius)); // Position the eye on the sphere's surface
      eyeRef.current.lookAt(camera.position); // Make the eye always look at the camera (or adjust based on your preference)
    }

    // Rotation of the main mesh
    if (meshRef.current) {
      const rotationSpeed = 2;
      meshRef.current.rotation.y += mouseXNormalized * rotationSpeed;
      meshRef.current.rotation.x += mouseYNormalized * rotationSpeed;
    }

    // Floating effect for the main mesh
    const time = Date.now() * 0.00008;
    const radius = 0.5;
    const speed = 0.2;
    const offset = 1;

    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(time * speed) * (radius - offset) + position[1];
      meshRef.current.position.y = Math.sin(time + position[1]) * radius * position[1];
      meshRef.current.position.z = Math.sin(time * speed) * radius + position[1];
    }
  });

  // Load texture once
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(logoUrl, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [logoUrl]);

  // Handle mesh click (toggle navigation menu visibility)
  const handleMeshClick = () => {
    console.log('Mesh Clicked');
    setShowNav((prevShowNav) => !prevShowNav); // Toggle visibility
  };
  const burningColor = new THREE.Color(1,3, 0);//fiery orange
  return (
    <>
      <mesh ref={meshRef} position={position} onClick={() => setShowNav(false)}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshPhysicalMaterial
          attach="material"
          metalness={1.5}
          map={texture}
          color="silver"
          opacity={1}
          transparent
        />

        {/* Eye attached directly to the sphere */}
        <mesh ref={eyeRef} position={[1, 1, 5]}>
          <sphereGeometry args={[1.8, 15, 32]} />
          <meshPhysicalMaterial
            attach="material"
            roughness={1.5}
            metalness={2}
            color="black"
             // Glowing effect
          />
        </mesh>

        {showNav && (
          <Html position={[position[0] - 10, position[1] + 2, position[2]]}>
            <Navbar />
          </Html>
        )}
      </mesh>
    </>
  );
};

export default Companion;
