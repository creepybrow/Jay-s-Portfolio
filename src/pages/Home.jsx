import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Robot from '../components/Robot';
import Jay from '../Assets/Jay.jpg';
import ShootingStar from '../components/Star.jsx';

const skillData = {
  HTML: {
    image: '/path/to/html-image.jpg',
    description:'HTML is the stardard markup language for creating web pages.'
  },
  CSS:{
    image:'/path/to/css-image.jpg',
    description: 'JavaScript is a programming language use to make we pages interactive.'
  },
  REACT:{
    image: '/path/to/react-image.jpg',
    description:'Vite is a next-generation, fast build tool for moder web development.'
  },
  Vite:{
    image: '/path/to/vite-image',
    description: 'TypeScript is a superset of JavaScript that adds static typing.'
  },
  'THREE.js':{
    image: '/path/to/three.js-imgae.jpg',
    description: 'Three.js is a 3D JavaScript library use to create 3D graphics in the browser.'
  }
}

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [robotScale, setRobotScale] = useState([1, 1, 1]);
  const [robotPosition, setRobotPosition] = useState([0, -6.5, -43]);
  const [rotation, setRotation] = useState([0.1, 4.7, 0]);

  // Adjust robot position and scale based on screen size
  useEffect(() => {
    const adjustRobotForScreenSize = () => {
      let screenScale = [1, 1, 1];
      let screenPosition = [0, -6.5, -43];
      let rotation = [0.1, 4.7, 0];

      if (window.innerWidth < 768) {
        screenScale = [0.9, 0.9, 0.9];
        screenPosition = [0, -6.5, -43]; // You can change this based on the mobile view
      }

      setRobotScale(screenScale);
      setRobotPosition(screenPosition);
      setRotation(rotation);
    };

    adjustRobotForScreenSize(); // Initial call

    // Re-adjust the robot position on screen resize
    window.addEventListener('resize', adjustRobotForScreenSize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', adjustRobotForScreenSize);
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <section id="home-page">
      <div className="Engineer-title">
        Jay Stewart, Frontend Software Engineer
        <figure className="">
          <img className="my-pic" src={Jay} alt="Jay" />
        </figure>
      </div>
        <div className='skill-wrapper'>
        <ul className='skill-container'>
          <li><p className='skill'>HTML</p></li>
          <li><p className='skill'>CSS</p></li>
          <li><p className='skill'>JAVASCRIPT</p></li>
          <li><p className='skill'>REACT</p></li>
          <li><p className='skill'>VITE</p></li>
          <li><p className='skill'>TYPESCRIPT</p></li>
          <li><p className='skill'>THREE.JS</p></li>
          </ul>
        </div>
      <Canvas
        camera={{ near: 1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={5} />
          <ambientLight intensity={0.8} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#00000" intensity={5} />
          {[...Array(500)].map((_, index) => (
            <ShootingStar
              position={[Math.random() * 20 + 10, Math.random() * 100 + 100, Math.random() * 10]}
              speed={10 + Math.random() * 80}
               // Adjust initial speed for each star
              key={index}
            />
          ))}
          {/* <Robot
            position={robotPosition}
            scale={robotScale}
            rotation={rotation}
            setIsRotating={setIsRotating}
          /> */}
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
