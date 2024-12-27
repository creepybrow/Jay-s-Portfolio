import React, { useState } from 'react'
import { navLinks } from '../constants/index.js';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='nav-bar__header'>
        <NavLink to="/" className="nav-link">
            <p className=''>Home</p>
        </NavLink>
        <NavLink to="/about" className="nav-link">
            About
        </NavLink>
        <NavLink to="/projects" className="nav-link">
            Projects
        </NavLink>
    </header>
  )
}

export default Navbar