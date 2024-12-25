import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Hero from '../sections/Hero.jsx';
import ShootingStar from '../components/Star.jsx';
import gsap from 'gsap';
import Soda from '../Assets/sodabubbles.avif'

const skillData = {
  HTML: {
    
    description: 'HTML is the standard markup language for creating web pages. This is the structur of all web development'
  },
  CSS: {
    
    description: 'CSS or better known as Cascade Style Language is used to style web page. This is like painting your house just after building the foundation. Build the structure first, and then make it look good. This can be challenging since it takes a lot of practice to understand how everything within the language has a priority over one another. But overall, it is a fun one to manipulate the variables.',
  },
  REACT: {
    
    description: 'React combines HTML, CSS, and JAVASCRIPT in one library. Best to understand these languages before diving in since a website can easily break without warning. There is always a reason that can be hard to problem solve, but REACT is like going into a book store, and once you pick that book, the computer knows exactly how to handle the correct code. REACT is just like a child who does not know anything until picking up the recipie book to have that AHA momont!',
  },
  Vite: {
  
    description: 'Vite is a fast build tool for modern web development. Just a library that makes things easier for React to handle web development like 3d elements. Vite is Usually combined with Tailwind as well to make the work flow quicker and smooth. So, less effort for the designer like myself or others.',
  },
  'THREE.js': {
    
    description: 'Three.js is a JavaScript library used to create 3D graphics in the browser.',
  },
  Tailwind:{
    
    description:'Tailwind is the savior to most web developers who choose to use it. This is like a tutor who is close but is never going to breath down your neck during crunch time. It is like the smart guy suggesting items and you therefore fill in the blank once you see the item you would like to fill in. In a way, also like texting when the AI tries to autocorrect or complete your words. However, usually not so annyoying with coding.'
  }
};

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [robotScale, setRobotScale] = useState([1, 1, 1]);
  const [robotPosition, setRobotPosition] = useState([0, -6.5, -43]);
  const [rotation, setRotation] = useState([0.1, 4.7, 0]);
  const [activeSkill, setActiveSkill] = useState(null); // Track clicked skill

  // Handle the click event to toggle skills
  const handleSkillClick = (skill) => {
    // Check if the clicked skill is already active
    if (activeSkill === skill) {
      // If the skill is clicked again, reset the positions
      gsap.to('.skill', {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
      });
      setActiveSkill(null);
    } else {
      // Animate the other skills to move away when one is clicked
      gsap.to('.skill', {
        x: (index) =>
          index === Object.keys(skillData).indexOf(skill)
            ? 0
            : Math.random() * 2000 - 500,
        opacity: (index) => (index === Object.keys(skillData).indexOf(skill) ? 1 : 0),
        duration: 1,
        stagger: 0.1,
      });
      setActiveSkill(skill); // Set the active skill
    }
  };

  return (
    <section id="home-page">
      <div className="Engineer-title">
        Jay Stewart Frontend Software Engineer
      </div>
      <Hero />
      <div className="skill-wrapper">
        <ul className="skill-container">
          {Object.keys(skillData).map((skill, index) => (
            <li key={index} onClick={() => handleSkillClick(skill)}>
              <p className={`skill ${activeSkill === skill ? 'active' : ''}`}>{skill}</p>
            </li>
          ))}
        </ul>
        {activeSkill && (
          <div className="skill-info-container">
            <h2></h2>
            <img src={skillData[activeSkill].image} alt={activeSkill} />
            <p>{skillData[activeSkill].description}</p>
          </div>
        )}
      </div>
      <Canvas camera={{ near: 1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 10, 1]} intensity={5} />
          <ambientLight intensity={0.8} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#00000" intensity={5} />
          {[...Array(50)].map((_, index) => (
            <ShootingStar
              position={[Math.random() * 20 + 1, Math.random() * 100 + 100, Math.random() * -10]}
              speed={10 + Math.random() * 80}
              key={index}
            />
          ))}
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
