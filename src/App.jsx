import * as THREE from 'three';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {Home, About, Projects, Contact} from './pages';
import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"

const App = () => {
  return (
    <div>
      <main className="bg-slate-300/20">
      <Router>
        <Navbar/>
        <Hero/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
      </main>
    </div>
  )
}

export default App