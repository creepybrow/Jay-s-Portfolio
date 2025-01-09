import React from "react";
import { skills } from "../constants";

const About = () => {
  return (
    <section className="about-section">
      <h1 className="about-title"></h1>
      <div className="about-me__container">
        <p className="about-me__para">
          Software Engineer based in Oregon, I have a passion for creating
          robust websites with fantastic designs.
        </p>
        <p className="about-journey">
          Currently learning: <span className="Threejs">THREE.JS</span>in{" "}
          <span className="about-react">React</span> and{" "}
          <span className="hard-language">
            C++
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
            <span className="floating-plus">+</span>
          </span>
        </p>
        <p className="advertisement-para">
          Looking to make your next website? Let's create something truly
          magical together!
          <h3 className="operation-title">How I approach my work...</h3>
        </p>
        <div className="advertisement-container"></div>
        {/*Stone-like Containers*/}
        <div className="Plan-Container">
          <div className="Plan-Box">
            <h1>CONNECT</h1>
            <p>
              Contact by e-mail. Tell me what you like about my work and how I
              may be able to assist you.
            </p>
          </div>
          <div className="Update-Box">
            <h1>PLAN</h1>
            <p>
              We go over your goals, and lay out what you need. The information
              you want displayed and how you want it presented. Coding can be
              very time consuming without a proper sturcture. During this time,
              if we're both comfortable with the project, I begin coding and
              update you. We're a team now, and I plan on making our business
              worth it.
            </p>
          </div>
          <div className="Publish-Box">
            <h1>PUBLISH</h1>
            <p>
              This is the phase in which you are most comfortable with the
              design. Once we both agree on the work I have made, I will present
              it to the world for everyone to see. I do the heavy lifting, and
              you sit back as your website brings in customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
