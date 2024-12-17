import React from 'react'
import {skills} from '../constants';

const About = () => {
  return (
    <section className='about-section'>
      <h1 className='about-title'></h1>
      <div className='about-me__container'>
        <p className='about-me__para'>Software Engineer based in Oregon, 
          I have a passion for creating robust websites with fantastic designs, 
          and video games on the side.</p>
        <p className='about-journey'>Currently learning: <span className='Threejs'>THREE.JS</span>in <span className='about-react'>React</span> and <span className='hard-language'>C++
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          <span className='floating-plus'>+</span>
          </span></p>
      </div>
      <div className='advertisement-container'>
          <p className='advertisement-para'>Looking to make your next website?
           Let's create something truly magical together! 
        </p>
      </div>
      <div className='about-me__container'>
        <h3 className='operation-title'>How I approach my work...</h3>
        <div className='Plan-Container'>
          <div className='Plan-Box'>
            <h1 className='Plan-Title'>THE PLAN</h1>
          </div>
          <div className='Update-Box'>
            <h1 className='Talk'>We Chat</h1>
            <p>Contact me through e-mail, and then I get back. We set up a meeting after.
            </p>
          </div>
          <div className='Publish-Box'>
            <h1 className='publish'>PUBLISH</h1>
            <p>This is the phase in which you are most comfortable with the design.
              Once it's agreed on the name of your website and the results are solid,
              I present YOUR website to the world!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About