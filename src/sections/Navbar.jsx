import React, { useState } from 'react'
import { navLinks } from '../constants/index.js';
import { NavLink } from 'react-router-dom';

// const Navbar = ({onClose}) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggleMenu = () => setIsOpen(prev=>!prev);//Toggling the state correctly

//     const NavItems = () =>{
//         return(
//             <div>
//                 <ul className='nav-ul'>
//                     {navLinks.map(({id, href, name}) =>(
//                         <li key={id} className='nav-li'>
//                             <a href={href} className='nav-li_a'onClick={onClose}>
//                                 {name}
//                             </a>
//                         </li>
//                     ))}
//                     <button className='white-button' onClick={onClose}>
//                     </button>
//                 </ul>
//             </div>
//         )
//     }
 
//       return (
//     <header className='fixed top-0 left-0 right-0 z-50 bg-black/90'>
//         <div className='max-w-7xl mx-auto'>
//             <div className='flex justify-between items-center py-5 mx-auto c-space'>
//                 <a href="/" className='text-blue-400 font-bold text-xl hover:text-white
//                 transition-colors'>  
//                 </a>
//                 <button onClick={toggleMenu} className='menu-button'>
//                 </button>
//                 <nav className="sm:flex hidden">
//                     <NavItems/>
//                 </nav>
//             </div>
//         </div>

//         <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
//             <nav className='p-5'>
//                 <NavItems/>
//             </nav>
//         </div>
//     </header>
//   )
// }

// export default Navbar

const Navbar = () => {
  return (
    <header className='header'>
        <NavLink to="/" className="w-10 h-10 rounded-lg 
        bg-white items-center justify-center flex font-bold shadow-md">
            <p className=''>JS</p>
        </NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ?
        'black' : 'text-black'}>
            About
        </NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ?
        'text-blue-500' : 'text-black'}>
            Projects
        </NavLink>
    </header>
  )
}

export default Navbar