import React from 'react';
import Hero from '../sections/Hero';
import Week6 from '../Assets/Week6.jpg';
import Batman from '../Assets/Batman.jpg';
import Week3 from '../Assets/Week3.jpg';
import firstwebsite from '../Assets/firstwebsite.jpg';
import TreactClone from '../Assets/TreactClone.jpg';
import AppleClone from '../Assets/AppleClone.jpg';
import BrainWave from '../Assets/BrainWave.jpg';
import Intern from '../Assets/Intern.jpg';


// Define project data array
const projects = [
  {
    title: "Year One, Coding with Angela Yu(Udemy)",
    link: "https://creepybrow.github.io/First-Published-Website/",
    projectName: "First Published Website",
    imgSrc: firstwebsite,
    description:"Key difference. Angela Yu Didn't have a staff available to help!",
  },
  {
    title:"Frontend Simplified by David Bragg",
  },
  {
    link: "https://creepybrow.github.io/Week-2-Final/",
    imgSrc:TreactClone,
    description:"HTML and CSS put to the test. I had to make a clone of the Treact Webpage."
  },
  {
    title: "Javascript Final",
    link: "https://creepybrow.github.io/Week4-Movies-API/",
    projectName: "Week 4. Javascript Final.",
    imgSrc: Week3,
    description:"This project used the OMDB API",
    imgAlt: "Week 4 Javascript API"
  },
  {
    title:"React",
    description:"It was time to start grinding in React using clones to create real world websites. I thought to myself several times, 'this isn't going to be too hard, LOL, I was wrong... and two months later!!'. "
  },
  {
    title:"Clones",
    link: "https://j-brainwave.com/",
    projectName: "AppleClone",
    imgSrc: AppleClone,
    imgAlt: "AppleWebsite",
  },
  {
    link: "https://js-brain.j-brainwave.com/",
    projectName: "BrainWave",
    imgSrc:BrainWave,
  },
  {
    title: "Week 5/6",
    description: "Comics API. An attempt at working with an API.",
    link: "https://comicapi.website/",
    projectName: "Comics API",
    imgSrc: Batman,
    imgAlt: "Batman API",
  },
  {
    title: "Week 5/6 - Hard Mode is just getting started. REACT",
    description: "Movies API through OMDB",
    link: "https://movieapi.website/",
    projectName: "Movies Projects",
    imgSrc: Week6,
    imgAlt: "Movies Project",
  },
  {
    title: "Internship. FES puts all my skills to the test",
    link: "https://jay-internship-hdv8.vercel.app/",
    projectName: "Movies Projects",
    imgSrc: Intern,
    imgAlt: "Movies Project",
  },
 
];

const ProjectItem = ({ title, description, link, projectName, imgSrc, imgAlt }) => (
  <div className='project-item'>
    <h1 className='project-title'>{title}</h1>
    {link && <a href={link} className="project-link"><img src={imgSrc}></img></a>}
    {description && <p className='project-description'>{description}</p>}
  </div>
);

const Projects = () => {
  return (
    <div className='projects-container'>
      <div className='project-container'>
        <h1 className='project-header'>My Projects</h1>
        <div className='links-container'>
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              projectName={project.projectName}
              imgSrc={project.imgSrc}
              imgAlt={project.imgAlt}
            />
          ))}
          <div className="internship-info">
            <h1 className='solo-title'>Interviews</h1>
            <p className='Question-Mark'>To be Continued...?</p>
            <h5 className='boss-title'>BOSS BATTLE</h5>
            <p className='boss-description'>Next I will tackle  Data Structures, and Algorythms, Followed by<span className='AI'>{' '}A.I</span></p>
            <p className='Job'>Land 100K Job!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
