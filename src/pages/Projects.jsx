import React from 'react'
import Hero from '../sections/Hero'

const Projects = () => {
  return (
    <div className='projects-container'>
        <Hero/>
      <div className='project-container'>
        <h1 className='project-header'>My {''}Projects</h1>
        <div className='links-container'>
        <a href="" className='Year-one'>
          <h1>Year One, Project 1</h1>
          <p className='Year-one__para'>First shot at Web Dev with Angela Yu(Udemy)</p></a>
        <h1>Year Two, Frontend Simplified</h1>
        <a href="" className='Year-two'>
          <h2>First Project</h2>
          <p>Week 1 and 2(HTML, and CSS)</p></a>
        </div>
        <a href="" className='Week-two'>
          <h1 className='week-two__title'>Week 2 Final</h1>
          <p className='week-two__para'>Frontend Simplified puts my HTML and CSS Skills to the test with all my repetitve learning</p>
        </a>
        <a href="">
          <h1 className='week-three'>Week3 / 4</h1>
          <p className='Javascript-link'>Javascript Final</p>
        </a>
        <a href="">
          <h1 className='week-four'>week 5/6</h1>
          <p className='week-four__final'>React Final{' '}(Hard Mode Begins)</p>
        </a>
        <a href="">
          <h1 className='solo-title'>Intership, Finally!</h1>
          <p className='journey-para'>BUT, The Journey just started!</p>
        </a>
        <figure>
          <img src="" alt="" />
        </figure>
        <h5 className='boss-title'>
          BOSS BATTLE
        </h5>
        <p>Interview Time!</p>
      </div>
    </div>
  )
}

export default Projects