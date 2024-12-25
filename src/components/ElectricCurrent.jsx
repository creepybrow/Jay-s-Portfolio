import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';

const ElectricCurrent = ({ camera }) => {
  const points = [];
  const count = 500;  // Increase the number of points
  const lineRef = useRef();
  const [isZapping, setIsZapping] = useState(false);
  const mouse = new THREE.Vector2();
  const maxZapDistance = 1000;
  const attractionStrength = 700; // Adjust attraction strength

  // Generate points for the electric current with random initial positions
  for (let i = 0; i < count; i++) {
    const x = Math.cos(i * 0.8) * 8;
    const y = Math.sin(i * 0.8) * 8;
    const z = Math.sin(i * 0.8) * 0;
    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const raycaster = new THREE.Raycaster();

  const { camera: contextCamera } = useThree();
  const currentCamera = camera || contextCamera;

  useEffect(() => {
    if (!currentCamera) {
      console.error('Camera is not available');
      return;
    }

    const mouseMoveHandler = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 3 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    const zap = () => {
      const mousePosition = new THREE.Vector3(mouse.x, mouse.y, 50);
      raycaster.setFromCamera(mousePosition, currentCamera);

      const intersects = raycaster.intersectObject(lineRef.current);

      if (intersects.length > 0) {
        setIsZapping(true);
      } else {
        setIsZapping(false);
      }
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
      const time = Date.now() * 0.002; // Slow down time progression

      if (lineRef.current) {
        for (let i = 0; i < points.length; i++) {
          const point = points[i];

          // Core of the plasma ball
          const corePosition = new THREE.Vector3(0,0, 0);  // Plasma ball center

          // Calculate distance between point and core (attract to core)
          const distanceToCore = point.distanceTo(corePosition);
          const directionToCore = corePosition.clone().sub(point).normalize();

          // Attraction force to the core
          point.add(directionToCore.multiplyScalar(0.1));  // Adjust speed of attraction

          // Pulsating behavior for the tendrils
          const pulsatingRadius = Math.sin(time + i * 0.5) * 0.5;
          const pulsatingAngle = Math.cos(time + i * 0.5) * 1.8;
          point.x += Math.sin(time + i) * pulsatingRadius;
          point.y += Math.cos(time + i) * pulsatingAngle;

          // Introduce slight jitter to create more dynamic behavior
          point.x += (Math.random() - 0.5) * 0.8;//Originally 0.8
          point.y += (Math.random() - 0.5) * 0.1;
          point.z += (Math.random() - 0.5) * 0.8;

          // Introduce attraction to the mouse for specific tendrils
          const worldMousePosition = new THREE.Vector3(mouse.x, mouse.y, 1);
          worldMousePosition.unproject(currentCamera);
          const distanceToMouse = point.distanceTo(worldMousePosition);

          if (distanceToMouse < maxZapDistance) {
            const directionToMouse = worldMousePosition.clone().sub(point).normalize();
            point.add(directionToMouse.multiplyScalar(attractionStrength));
          }
        }

        geometry.setFromPoints(points);
        lineRef.current.geometry = geometry;

        if (isZapping) {
          lineRef.current.material.uniforms.opacity.value = 0.2;
        } else {
          lineRef.current.material.uniforms.opacity.value = 0.6;
        }
      }
    };

    animate();
  }, [isZapping, points, mouse]);

  // Updated shader with improved noise and plasma effect
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      uniform float opacity;
      uniform float time;

      // Improved noise function for plasma look
      float noise(vec3 p) {
        return sin(p.x * 0.3 + p.y * 0.5 + p.z * 0.8 + time) * 0.1 + 0.1;
      }

      void main() {
        // Dynamic color based on position and time
        float distance = length(vPosition);
        vec3 color = vec3(0.3, 0.1, 0.8) * (2.0 - distance * 0.1);  // Base color for plasma
        color += vec3(0.3, 0.4, 0.4) * noise(vPosition) * 1.0;  // Add noise effect for electric arcs

        // Fading effect based on distance
        gl_FragColor = vec4(color, opacity);
      }
    `,
    uniforms: {
      opacity: { value: 0.5 },
      time: { value: 0 },
    },
    transparent: true,
  });

  useEffect(() => {
    const updateTime = () => {
      if (lineRef.current && lineRef.current.material) {
        lineRef.current.material.uniforms.time.value = Date.now() * 0.02;
      }
      requestAnimationFrame(updateTime);
    };
    updateTime();
  }, []);

  return (
    <>
      <line ref={lineRef} geometry={geometry} material={material} />
    </>
  );
};

export default ElectricCurrent;
