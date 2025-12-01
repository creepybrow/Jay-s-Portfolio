import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Hero from "../sections/Hero.jsx";
import ShootingStar from "../components/Star.jsx";
import gsap from "gsap";
import React from "react";
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
  const [showContactForm, setShowContactForm] = useState(false);

  const skillRadius = 500;
  const center = { x: 100, y: 100 };

  const skillPositions = Object.keys(skillData).map((skill, index) => {
    const angle = (index / Object.keys(skillData).length) * 2 * Math.PI;
    const x = center.x + skillRadius * Math.cos(angle);
    const y = center.y + skillRadius * Math.sin(angle);
    return { skill, x, y };
  });

  useEffect(() => {
    // On load, set the skills initially invisible and moved down
    gsap.set(".skill", { opacity: 0, y: 100 });

    // After a brief delay, animate skills upwards with a staggered effect
    gsap.to(".skill", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1, // Stagger the animations
      delay: 2, // Wait for 2 seconds before starting the animation
      ease: "power2.out",
    });
  }, []);

  // Handle the contact form visibility and animations with GSAP
  useEffect(() => {
    if (showContactForm) {
      gsap.to(".contact-form-modal", {
        opacity: 1,
        y: 1,
        duration: 0.5,
        ease: "power2.out",
        visibility: "visible",
        pointerEvents: "auto", // Allow interaction when modal is visible
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".contact-form-modal", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in",
        visibility: "visible",
        pointerEvents: "none", // Disable interaction when modal is hidden
      });
      document.body.style.overflow = "auto";
    }
  }, [showContactForm]);

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
          setShowContactForm(false); // Close the form after submission
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  const handleSkillClick = (skill) => {
    if (activeSkill === skill) {
      gsap.to(".skill", { y: 0, opacity: 1, duration: 0.1, stagger: 0.8 });
      gsap.to(".skill-info-container", {
        opacity: 0,
        duration: 1.5,
        ease: "power1.out",
        onComplete: () => setActiveSkill(null),
      });
      gsap.to(".skill-title-container", {
        opacity: 0,
        duration: 0.1,
        ease: "power2.in",
      });
    } else {
      gsap.to(".skill", { y: 0, opacity: 0, duration: 0.5, stagger: 0.1 });
      gsap.to(".skill-title-container", { opacity: 0, duration: 0.5, stagger: 5 });
      gsap.to(".skill-description", {
        opacity: 0,
        y: 0,
        duration: 0.1,
        ease: "power2.out",
      });
      setActiveSkill(skill);
    }
  };

  const handleTitleClick = () => {
    if (activeSkill) {
      handleSkillClick(activeSkill);
    }
  };

  const handleContactButtonClick = () => {
    setShowContactForm((prev) => !prev);
  };

  return (
    <section id="home-page">
      <Hero />
      <div className="skill-wrapper">
        <p className="skill-instruction">
          My Skills. Click Each One to Learn More. Click the skill in the container to close.
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
        {activeSkill && (
          <div className="skill-info-container">
            <div className="skill-title-container" onClick={handleTitleClick}>
              <h2 className="skill">{activeSkill}</h2>
            </div>
            <p className="skill-container__info">
              {skillData[activeSkill].description}
            </p>
          </div>
        )}
      </div>

      <div className="canvas-container">
        <div className="overlay">
          <h1 id="name">Hello, I'm Jay</h1>
          <p id="introduction">
            Frontend Software Developer. I code and make unique experiences.
            If you like what you see, Let's chat!
          </p>
          <button
            id="button"
            className="contact-btn"
            type="button"
            onClick={handleContactButtonClick}
          >
            I'm Just One Click Away
          </button>

          <div className="contact-form-modal">
            {showContactForm && (
              <div style={{ position: "absolute", height: "800px" }}>
                <Canvas
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                  camera={{ near: 1, far: 1000, position: [0, 0, 5] }}
                >
                  <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 10, 1]} intensity={1} />
                    <ambientLight intensity={1} />
                    <pointLight />
                    <spotLight />
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#00000" intensity={1} />
                    {[...Array(100)].map((_, index) => (
                      <ShootingStar
                        position={[
                          Math.random() * 20 + 1,
                          Math.random() * 100 + 1,
                          Math.random() * -10,
                        ]}
                        speed={10 + Math.random() * 10}
                        key={index}
                      />
                    ))}
                  </Suspense>
                </Canvas>
                <form onSubmit={handleFormSubmit} style={{ pointerEvents: "auto" }}>
                  <label>Name</label>
                  <input type="text" name="user_name" required />
                  <label>Email</label>
                  <input type="email" name="user_email" required />
                  <label>Message</label>
                  <textarea name="message" required></textarea>
                  <button type="submit">Send Message</button>
                  <button
                    id="button"
                    className="close-btn"
                    type="button"
                    onClick={() => setShowContactForm(false)}
                  >
                    Close
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
