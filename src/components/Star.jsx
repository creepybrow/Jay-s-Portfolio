import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

// Function to create random properties for stars
const generateRandomStar = () => ({
  x: Math.random() * 20 - 10,  // Random X position
  y: Math.random() * 20 - 10,  // Random Y position
  z: Math.random() * -10 - 10,  // Random initial Z position
  speed: 10 + Math.random() * 80,  // Random speed
});

const ShootingStar = ({ position, speed, color }) => {
  const ref = useRef();

  // Memoize the initial properties for the star (position, speed)
  const { x, y, z, speed: starSpeed } = useMemo(() => generateRandomStar(), []);

  useFrame(() => {
    if (ref.current) {
      // Move the star toward the camera (warp speed effect)
      ref.current.position.z += starSpeed * 0.01;

      // Reset the star's position when it reaches the camera
      if (ref.current.position.z > 1) {
        // Reset star to a random position in the scene
        ref.current.position.z = -5;
        ref.current.position.x = Math.random() * 20 - 10;
        ref.current.position.y = Math.random() * 20 - 10;
      }
    }
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.1, 8, 8]} /> {/* Reduced segments for better performance */}
      <meshStandardMaterial color={color} emissive="red" emissiveIntensity={1} />
    </mesh>
  );
};

export default ShootingStar;
