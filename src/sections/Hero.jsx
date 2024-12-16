import { PerspectiveCamera, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import CanvasLoader from '../components/CanvasLoader'
import {Leva, useControls} from "leva";
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import FloatingBubble from '../components/Bubble.jsx'
import ElectricSphere from '../components/ElictricSphere.jsx'
import Ball from '../components/Ball.jsx'
import Companion from '../components/Companion.jsx'
import CrazyBall from '../components/CrazyBall.jsx'
import PlasmaBall from '../components/Bubble.jsx'


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
  setCameraPosition([0,0,20])//Zoom out
  setInputVisible(false);
}

const sizes = calculateSizes(isSmall,)
  return (
    <section className='h-full w-full flex-col absolute mt-50 py-40 overflow-hidden'>
          <Canvas
          style={{background:'transparent', pointerEvents:'auto'}}
          camera={{position: [2,0,20], fov:75}}
          gl={{alpha:true}} // enable alpha for tranparency
          >
              <Suspense fallback={<CanvasLoader/>}>
             <PerspectiveCamera makeDefault position={[5,5,40]}/>
             <group>
                {/* <FloatingBubble/> */}
                {/* <PlasmaBall/> */}
                {/* <FloatingLogo/> */}
                {/* <BubbleCluster/> */}
                <ElectricSphere/>
                <CrazyBall/>
                {/* <Lightning/> */}
                <Ball/>
                 <Companion
                style={{position:'relative',
                  pointerEvents:'auto',
                  zIndex:1
                }}/>             
             </group>
             <ambientLight intensity={0.1}/>
             <directionalLight position={[15,8,25]} intensity={20}/>
              </Suspense>
          </Canvas>
    </section>
  )
}
export default Hero;