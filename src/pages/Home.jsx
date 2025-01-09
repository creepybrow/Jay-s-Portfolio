import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Hero from "../sections/Hero.jsx";
import ShootingStar from "../components/Star.jsx";
import gsap from "gsap";
import React from "react";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import emailjs from "emailjs-com";

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
  const [activeTitle, setActiveTitle] = useState(null); // Track moving title
  const [showContactForm, setShowContactForm] = useState(false);

  // Handle the contact form visibility and animations with GSAP
  useEffect(() => {
    // When the form is shown, animate it in
    if (showContactForm) {
      gsap.to(".contact-form-modal", {
        opacity: 1,
        y: 5,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      // When the form is hidden, animate it out
      gsap.to(".contact-form-modal", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [showContactForm]); // Trigger animation on showContactForm change

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    emailjs
      .sendForm("service_20jpaxp", "template_r6z69ye", form, "YOUR_USER_ID")
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.reset();
          setShowContactForm(false); // Hide the form after submission
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  // Handle the click event to toggle skills
  const handleSkillClick = (skill) => {
    if (activeSkill === skill) {
      gsap.to(".skill", { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 });
      gsap.to(".skill-info-container", {
        opacity: 0,
        duration: 0.5,
        ease: "power1.in",
        onComplete: () => setActiveSkill(null),
      });
      gsap.to(".skill-title-container", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(".skill", { opacity: 0, duration: 0.1 });
      gsap.to(".skill-title-container", { opacity: 0, duration: 0.8 });
      gsap.to(".skill-description", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
      setActiveSkill(skill);
    }
  };

  // Ensure clicking the title also toggles the state
  const handleTitleClick = () => {
    if (activeSkill) {
      handleSkillClick(activeSkill);
    }
  };

  const handleContactButtonClick = () => {
    // Toggle the state when the button is clicked
    setShowContactForm(!showContactForm);
  };

  return (
    <section id="home-page">
      <Hero />
      <div className="skill-wrapper">
        <p className="skill-instruction">
          My skills. Click on each to learn more.
        </p>
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
            <div className="skill-title-container" onClick={handleTitleClick}>
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
        <Canvas camera={{ near: 1, far: 1000, position: "absolute", zIndex: 1 }}>
          <Suspense fallback={<Loader />}>
            <directionalLight position={[1, 10, 1]} intensity={1} />
            <ambientLight intensity={0.8} />
            <pointLight />
            <spotLight />
            <hemisphereLight skyColor="#b1e1ff" groundColor="#00000" intensity={1} />
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
          <button
            type="button"
            onClick={handleContactButtonClick}
          >
            Contact Me
          </button>

          {/* Contact Form Modal */}
          {showContactForm && (
            <div className="contact-form-modal">
              <form onSubmit={handleFormSubmit}>
                <h3>Contact Me</h3>
                <label>Name</label>
                <input type="text" name="user_name" required />
                <label>Email</label>
                <input type="email" name="user_email" required />
                <label>Message</label>
                <textarea name="message" required></textarea>
                <button type="submit">Send Message</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowContactForm(false); // Close the form
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
