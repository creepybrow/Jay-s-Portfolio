import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Hero from "../sections/Hero.jsx";
import ShootingStar from "../components/Star.jsx";
import gsap from "gsap";
import React from "react";
import { TextGeometry } from "three/examples/jsm/Addons.js";

const IntroductionStar = () => {
  const [font, setFont] = useState(null);

  return (
    <mesh>
      <TextGeometry
        attach="geometry"
        args={[
          "Hello! I'm Jay Stewart, a passionate web developer. I could be working for you. If you like what you see, let's connect!",
          { font, size: 1, height: 0.1 },
        ]}
      />
      <meshStandardMaterial attach="material" color="#00ff00" />
    </mesh>
  );
};

const skillData = {
  HTML: {
    description:
      "HTML is the standard markup language for creating web pages. This is the structure of all web development.",
  },
  CSS: {
    description:
      "CSS, or Cascade Style Sheets, is used to style web pages. It is like painting your house after building the foundation. Build the structure first, then make it look good.",
  },
  REACT: {
    description:
      "React combines HTML, CSS, and JavaScript in one library. It’s best to understand these languages before diving into React.",
  },
  Vite: {
    description:
      "Vite is a fast build tool for modern web development. It makes things easier for React, especially when working with 3D elements.",
  },
  "THREE.js": {
    description:
      "Three.js is a JavaScript library used to create 3D graphics in the browser.",
  },
  Tailwind: {
    description:
      "Tailwind is a utility-first CSS framework. It is like a smart assistant who suggests solutions that you can fill in, rather than dictating every detail.",
  },
};

const Home = () => {
  const [activeSkill, setActiveSkill] = useState(null); // Track clicked skill

  // Handle the click event to toggle skills
  const handleSkillClick = (skill) => {
    // Check if the clicked skill is already active
    if (activeSkill === skill) {
      // If the skill is clicked again, reset everything
      gsap.to(".skill", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
      });
      gsap.to(".skill-info-container", {
        opacity: 0,
        duration: 0.5,
        onComplete:() => setActiveSkill(null),
      });
      gsap.to(".skill-title-container", {
        opacity: 1, // Make the title visible again
        y: 0, // Move title back to original position
        duration: 1,
        ease: "power2.out",
      });
      setActiveSkill(null); // Reset active skill
    } else {
      // 1. Animate the other skills to move away when one is clicked
      gsap.to(".skill", {
        x: (index) =>
          index === Object.keys(skillData).indexOf(skill)
            ? 0
            : Math.random() * 2000 - 500,
        opacity: (index) =>
          index === Object.keys(skillData).indexOf(skill) ? 1 : 0,
        duration: 1,
        stagger: 0.1,
      });

      // 2. Move the skill title into the skill-info-container and fade out the skill
      gsap.to(".skill-title-container", {
        opacity: 0, // Fade out the title initially
        duration: 0.8, // Short delay before the skill title fades
      });

      gsap.to(".skill", {
        opacity: 0, // Fade out the skill from the list
        duration: 0.1,
      });

      // 3. Move the title to the skill-info-container and make it visible again
      gsap.to(".skill-title-container", {
        opacity: 1, // Fade in the skill title
        y: 0,
        x: 0, // Move it back to its position in the container
        duration: 0.2,
        ease: "power1.inOut",
      });

      // 4. Fade in the skill description
      gsap.to(".skill-description", {
        opacity: 1,
        y: 0, // Fade the description into view
        duration: 1,
        ease: "power2.out",
      });

      setActiveSkill(skill); // Set the active skill
    }
  };

  return (
    <section id="home-page">
      <Hero />
      <div className="skill-wrapper">
        <ul className="skill-container">
          {Object.keys(skillData).map((skill, index) => (
            <li key={index} onClick={() => handleSkillClick(skill)}>
              <p className={`skill ${activeSkill === skill ? "active" : ""}`}>
                {skill}
              </p>
              
            </li>
          ))}
        </ul>

        {/* Skill Info Container Below Stars */}
        {activeSkill && (
          <div className="skill-info-container">
            {/* Title of the Skill that Moves into the Container */}
            <div className="skill-title-container">
              <h2 className="skill">{activeSkill}</h2>
            </div>
            {/* Description of the Skill */}
            <p className="skill-container__info">
              {skillData[activeSkill].description}
            </p>
          </div>
        )}
      </div>
      {/* 3D Scene with Canvas */}
      <div className="canvas-container">
        <Canvas camera={{ near: 1, far: 1000 }}>
          <Suspense fallback={<Loader />}>
            <directionalLight position={[1, 10, 1]} intensity={1} />
            <ambientLight intensity={0.8} />
            <pointLight />
            <spotLight />
            <hemisphereLight
              skyColor="#b1e1ff"
              groundColor="#00000"
              intensity={1}
            />
            {[...Array(10)].map((_, index) => (
              <ShootingStar
                position={[
                  Math.random() * 20 + 1,
                  Math.random() * 100 + 100,
                  Math.random() * -10,
                ]}
                speed={100 + Math.random() * 80}
                key={index}
              />
            ))}
          </Suspense>
        </Canvas>
        <div className="overlay">
          <h1 id="name">Hello, I'm Jay</h1>
          <p id="introduction">Frontend Software Developer.</p>
          <p>I code and make unique experiences.</p>
          <p>If you like what you see, Let's chat!</p>
          <button className="contact-btn">Contact Me</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
