
import {useState, Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'
import Robot from '../components/Robot'

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  
  const adjustRobotForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0,-6.5,-43];
    let rotation = [0.1,4.7,0];
    
    if(window.innerWidth < 768){
      screenScale = [0.9,0.9,0.9];
      screenPosition = [0,-6.5,-43];
    }else{
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  }
  
  const [robotScale, robotPosition, rotation] = adjustRobotForScreenSize();
  
  return (
    <section className='w-full h-screen relative bg-black-500'>
      <div className='absolute top-28 left-0 right-0 z-10
      flex items-center justify-center'>
      WELOCOME
      </div>
      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 
        'cursor-grabbing' :'cursor-grab' }`}
      camera={{near: 0.1, far:1000}}
      >
        <Suspense fallback={<Loader/>}>
        <directionalLight position={[1,1,1]} intensity={5}/>
        <ambientLight intensity={0.5}/>
        <pointLight/>
        <spotLight/>
        <hemisphereLight skyColor="#b1e1ff" groundColor="#00000"
        intensity={2}/>
        <Robot
        position={robotPosition}
        scale={robotScale}
        rotation={rotation}
        setIsRotating={setIsRotating}
        />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home