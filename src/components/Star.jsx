import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

// Function to create random properties for stars
const generateRandomStar = (xRange = 20, yRange = 50, zRange = 50, speedRange = 80) => ({
  x: Math.random() * xRange - xRange / 2,  // Random X position
  y: Math.random() * yRange - yRange / 2,  // Random Y position
  z: Math.random() * -zRange - zRange,  // Random initial Z position (start far from camera)
  speed: 1 + Math.random() * speedRange,  // Random speed
});

const ShootingStar = ({ color, xRange = 500, yRange = 50, zRange = 50, speedRange = 30 }) => {
  const ref = useRef();

  // Memoize the initial properties for the star (position, speed)
  const { x, y, z, speed: starSpeed } = useMemo(() => generateRandomStar(xRange, yRange, zRange, speedRange), []);

  useFrame(() => {
    if (ref.current) {
      // Move the star toward the camera (warp speed effect)
      ref.current.position.z += starSpeed * 0.1;

      // Reset the star's position when it reaches the camera
      if (ref.current.position.z > 1) {
        // Reset star to a random position in the scene
        ref.current.position.z = -zRange;
        ref.current.position.x = Math.random() * xRange - xRange / 2;
        ref.current.position.y = Math.random() * yRange - yRange / 2;
      }
    }
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.1, 0.1, 80]} /> {/* Optimized segments for better performance */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
};

export default ShootingStar;
