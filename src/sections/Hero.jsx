import { PerspectiveCamera, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import CanvasLoader from '../components/CanvasLoader'
import HackerRoom from '../components/HackerRoom'
import {Leva, useControls} from "leva";
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants/index.js'
import Blackhole from '../components/Blackhole.jsx'
import { useGSAP } from '@gsap/react'
import FloatingBubble from '../components/Bubble.jsx'
import AboutMe from '../components/Rock.jsx'
import FloatingLogo from '../components/Rock.jsx'
import BubbleCluster from '../components/Ball.jsx'
import ElectricSphere from '../components/ElictricSphere.jsx'
import Ball from '../components/Ball.jsx'
import Companion from '../components/Companion.jsx'
import CrazyBall from '../components/CrazyBall.jsx'
import PlasmaBall from '../components/Bubble.jsx'
import Lightning from '../components/Lightning.jsx'


const Hero = () => {

 
const isSmall = useMediaQuery({maxWidth:440});
const isMobile = useMediaQuery({maxWidth:768});
const isTable = useMediaQuery({minWidth:768, maxWidth:1024});
//the scene
const MyScene = () => {
  const[isInputVisible, setInputVisible] = useState(false);
  const[cameraPosition, setCameraPosition] = useState([0,0,20]);
  const sizes = {targetPosition:[0,0,0]};//Define your target position

  const handleInputFocus =() => {
    setCameraPosition([0,0,10]);//Zoom in
    setInputVisible(true);
  };
}
const handleInputBlur = () => {
  setCameraPosition([2,0,20])//Zoom out
  setInputVisible(false);
}

const sizes = calculateSizes(isSmall,)
  return (
    <section className='h-full w-full flex-col absolute mt-50 py-40 overflow-hidden'>
          <Canvas
          style={{background:'transparent', pointerEvents:'auto'}}
          camera={{position: [0,0,20], fov:75}}
          gl={{alpha:true}} // enable alpha for tranparency
          >
              <Suspense fallback={<CanvasLoader/>}>
             <PerspectiveCamera makeDefault position={[0,0,20]}/>
             {/* <HackerRoom 
             position={[-10,-7.7,-10.0]} 
             rotation={[-2.7,-0.1,3.1]}
             scale={isMobile ? 0.07 : 0.1}/> */}
             <group>
                {/* <Blackhole
                position={[-10, 20, -10]}
                rotation={[4, 7, 50]}
                scale={[4, 10,1]}
                /> */}
                {/* <FloatingBubble/> */}
                <PlasmaBall/>
                <FloatingLogo/>
                <BubbleCluster/>
                <ElectricSphere/>
                <CrazyBall/>
                {/* <Lightning/> */}
                <Ball/>
                <Companion
                style={{position:'absolute',
                  pointerEvents:'auto',
                  zIndex:10
                }}/>            
             </group>
             <ambientLight intensity={0.6}/>
             <directionalLight position={[1,1,10]} intensity={0.7}/>
            
              </Suspense>
          </Canvas>
        <div className='w-full h-full absolute mt-10 py-5 inset-0'>
        <div className='w-full  h-full absolute mx-auto flex flex-col 
        sm:mt-14 mt-20  md:px-[10%] lg:px-[20%] gap-4'>
        <p id="flame" className="text-gray-500 fire cursor-pointer">
          <span>J</span>
          <span>A</span>
          <span>Y</span>
          {' '}
          <span>S</span>
          <span>T</span>
          <span>E</span>
          <span>W</span>
          <span>A</span>
          <span>R</span>
          <span>T</span>
          {' '}
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </p>
            <p className='text-red-400 fire cursor-pointer'>
              <span>F</span>
              <span>R</span>
              <span>O</span>
              <span>N</span>
              <span>T</span>
              <span>E</span>
              <span>N</span>
              <span>D</span>
              {' '}
              <span>W</span>
              <span>E</span>
              <span>B</span>
              {' '}
              <span>E</span>
              <span>N</span>
              <span>G</span>
              <span>I</span>
              <span>N</span>
              <span>E</span>
              <span>E</span>
              <span>R</span>
            </p>
        </div>
               {/* <Leva/> */}
           
        </div>

    </section>
  )
}
export default Hero;