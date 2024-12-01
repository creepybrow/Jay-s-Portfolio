import About from "./components/About"
import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"

const App = () => {
  return (
    <main className='max-w-7xl flex'>
      <Navbar/>
      <Hero/>
      <About/>
    </main>
  )
}

export default App