import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';

const Lightning = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 100); // Duration of the lightning
    }, 1000); // Frequency of lightning

    return () => clearInterval(interval);
  }, []);

  // Define lightning bolt points
  const points = [
    [0, 0, 0],
    [0.2, 1, 0],
    [0, 0.5, 0],
    [0.3, 0, 0],
    [0, 0, 0],
  ];

  return (
    <Line
      points={points}
      color={visible ? "yellow" : "transparent"} // Change color based on visibility
      lineWidth={2}
      opacity={visible ? 1 : 0} // Control opacity based on visibility
      dashed={false}
    />
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Lightning />
    </Canvas>
  );
};

export default App;
