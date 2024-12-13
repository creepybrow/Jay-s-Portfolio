import React from 'react'
import {skills} from '../constants';
import { div } from 'three/webgpu';

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm<span className='blue-gradient_text font-semibold'> Jay</span></h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>Software Engineer based in Oregon, I have a passion for creating lovely interfaces and
          fun experiences through code based applications. 
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skills) => (
            <div>
              <div>
                <img
                src={skills.imageUrl}
                alt={skills.name}
                className='w-1/2 h-1/2'/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About