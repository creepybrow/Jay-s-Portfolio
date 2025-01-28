import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';

// Custom curve to represent the electricity's path with pulsation
class ElectricPath extends THREE.Curve {
  constructor() {
    super();
    this.points = [];
  }

  getPoint(t) {
    const time = Date.now() * 0.00007;
    const x = Math.sin(t * 60 + time) * (60 + Math.sin(time * 10) * 2);  // Pulsating X position
    const y = Math.cos(t * 60 + time) * (60 + Math.cos(time * 10) *2); // Pulsating Y position
    const z = t * 1;  // Linear progression along Z axis (you can make this nonlinear for more dynamic movement)
    return new THREE.Vector3(x, y, z);
  }
}

const ElectricCurrent = ({ camera }) => {
  const path = new ElectricPath();  // Create the custom path
  const tubeRef = useRef();
  const [isZapping, setIsZapping] = useState(false);
  const mouse = new THREE.Vector2();
  const attractionStrength = 1; // Adjust attraction strength
  const { camera: contextCamera } = useThree();
  const currentCamera = camera || contextCamera;
  const raycaster = new THREE.Raycaster();




  useEffect(() => {
    if (!currentCamera) {
      console.error('Camera is not available');
      return;
    }

    const mouseMoveHandler = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    const zap = () => {
      const mousePosition = new THREE.Vector3(mouse.x, mouse.y, 1);
      raycaster.setFromCamera(mousePosition, currentCamera);
      const intersects = raycaster.intersectObject(tubeRef.current);
      setIsZapping(intersects.length > 0);
    };

    const zapInterval = setInterval(zap, 1);

    return () => {
      clearInterval(zapInterval);
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [mouse, currentCamera]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.2; // Slow down time progression

      // Update the tube path (this will animate the current's shape)
      path.getPoint(time); // Dynamically change the path based on time

      // Update the tube geometry
      if (tubeRef.current) {
        tubeRef.current.geometry = new THREE.TubeGeometry(path, 210, 110, 10, false);
       const animate = () => {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.2;
        path.getPoint(time);
        if(tubeRef.current){
          tubeRef.current.material.uniforms.time.value = time;
        }
       }
      }

    };

    animate();
  }, [path]);

  // Shader material for dynamic glowing electricity
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.2);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      uniform float opacity;
      uniform float time;

      // Improved noise function for plasma look
      float noise(vec3 p) {
        return sin(p.x * 500.8 + p.y * 300.3 + p.z * 100.8 + time) * 200.1 + 500.1;
      }

      void main() {
        float distance = length(vPosition);
        vec3 color = vec3(1.5, 20.2, 100.8) * (1.9 - distance * 1.3); // Base color for plasma
        color += vec3(8.7, 1000.1, 500.3) * noise(vPosition) * 100.6; // Add noise effect for electric arcs
        gl_FragColor = vec4(color, opacity);
      }
    `,
    uniforms: {
      opacity: { value: 0.1 },
      time: { value: 1 },
    },
    transparent: true,
  });

  return (
    <>
      <line ref={tubeRef} material={material} />
    </>
  );
};

export default ElectricCurrent;
