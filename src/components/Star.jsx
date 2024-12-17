import React from 'react';
import { useFrame } from '@react-three/fiber';

const ShootingStar = ({ position, speed, color }) => {
  const ref = React.useRef();

  // Make the star move toward the camera (warp speed effect)
  useFrame(() => {
    if (ref.current) {
      // Move the star along the z-axis toward the user
      ref.current.position.z += speed * 0.001;

      // As the star gets closer to the camera, increase the speed
      if (ref.current.position.z > 1) {
        ref.current.position.z = -1;  // Reset the star when it reaches the user
        ref.current.position.x = Math.random() * 20 - 10;  // Random X position
        ref.current.position.y = Math.random() * 20 - 10;  // Random Y position
      }
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 12, 16]} />
      <meshStandardMaterial color={color} emissive="red" emissiveIntensity={5} />
    </mesh>
  );
};

export default ShootingStar;
