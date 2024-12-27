import React from 'react';
import Hero from '../sections/Hero';
import Week6 from '../Assets/Week6.jpg';
import Batman from '../Assets/Batman.jpg';
import Week3 from '../Assets/Week3.jpg';

// Define project data array
const projects = [
  {
    title: "Year One, Project 1",
    description: "First shot at Web Dev with Angela Yu(Udemy)",
    link: "https://creepybrow.github.io/First-Published-Website/",
    projectName: "First Published Website",
  },
  {
    title: "Year Two, Frontend Simplified",
    description: "Week 1 and 2(HTML, and CSS)",
    link: "https://creepybrow.github.io/Week-2-Final/",
    projectName: "Week 2 Portfolio",
  },
  {
    title: "Week 2 Final",
    description: "Frontend Simplified puts my HTML and CSS Skills to the test with all my repetitive learning.",
    link: "",
    projectName: "Week 2 Final",
  },
  {
    title: "Week 3/4",
    description: "Javascript Final. This uses the OMDB API.",
    link: "https://creepybrow.github.io/Week4-Movies-API/",
    projectName: "Week 4. Javascript Final.",
    imgSrc: Week3,
    imgAlt: "Week 4 Javascript API"
  },
  {
    title: "Week 5/6",
    description: "Movies Projects and Comics API.",
    link: "https://movieapi.website/",
    projectName: "Movies Projects",
    imgSrc: Week6,
    imgAlt: "Movies Project",
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
    title: "React Final (Hard Mode Begins)",
    description: "React-based project, Apple Website Clone.",
    link: "https://j-brainwave.com/",
    projectName: "Apple Website Clone",
  },
];

const ProjectItem = ({ title, description, link, projectName, imgSrc, imgAlt }) => (
  <div className='project-item'>
    <h1>{title}</h1>
    {link && <a href={link} className="project-link">{projectName}</a>}
    {description && <p>{description}</p>}
    {imgSrc && <img src={imgSrc} alt={imgAlt} className="project-image" />}
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
            <h1 className='solo-title'>Internship, Finally!</h1>
            <p className='journey-para'>BUT, The Journey just started!</p>
            <h5 className='boss-title'>BOSS BATTLE</h5>
            <p>Interview Time!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
