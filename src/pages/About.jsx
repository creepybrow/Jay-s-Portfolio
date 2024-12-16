import React from 'react'
import {skills} from '../constants';

const About = () => {
  return (
    <section className='about-section'>
      <h1 className='about-title'></h1>
      <div className='about-me__container'>
        <p className='about-me__para'>Software Engineer based in Oregon, 
          I have a passion for creating robust websites with fantastic designs, 
          and video games on the side. Looking to make your next website?
           Let's create something truly magical together! 
        </p>
        <p>Currently learning: React, Three.js, and more!</p>
      </div>
      <div className='about-me__container'>
        <h3 className='about-skill__title'>My Skills</h3>
        <div className="skill-container">
          {skills.map((skill, index) => (
            <div key={index}>
              <div>
                <img
                src={skill.imageUrl}
                alt={skill.name}
                className=''/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About