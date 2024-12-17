import { Html } from '@react-three/drei';
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Navbar from '../sections/Navbar';

const Companion = ({ position = [5, 10, -5], logoUrl }) => {
    const meshRef = useRef();
    const topEyelidRef = useRef();
    const bottomEyelidRef = useRef();
    const [showNav, setShowNav] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    const blinkDuration = 500; // Blink duration (in ms)
    const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Easing function

    const sphereRadius = 5; // Radius of the sphere (adjust as necessary)
    const eyelidHeight = 4; // Height of the eyelid (adjust as necessary)

    // Calculate the position of the eyelids on the sphere's surface
    const calculateEyelidPosition = (yOffset) => {
        const angle = Math.PI / 6; // The angle where the eyelids are located (adjust as needed)
        const x = sphereRadius * Math.sin(angle); // X position based on angle
        const y = yOffset; // Y position adjusted for the eyelid height
        const z = sphereRadius * Math.cos(angle); // Z position based on angle
        return [x, y, z];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking(true);
            const startTime = performance.now();
            const animateBlink = (timestamp) => {
                const elapsed = timestamp - startTime;
                const t = Math.min(elapsed / blinkDuration, 1);
                const easedT = easeInOut(t);

                // Smooth eyelid animation along the y-axis
                if (topEyelidRef.current && bottomEyelidRef.current) {
                    const topYPosition = sphereRadius - (eyelidHeight * easedT); // Top eyelid moves down
                    const bottomYPosition = -(sphereRadius - (eyelidHeight * easedT)); // Bottom eyelid moves up

                    // Update the position of the eyelids based on the new yOffset
                    topEyelidRef.current.position.set(...calculateEyelidPosition(topYPosition));
                    bottomEyelidRef.current.position.set(...calculateEyelidPosition(bottomYPosition));
                }

                if (t < 1) {
                    requestAnimationFrame(animateBlink);
                } else {
                    setIsBlinking(false);
                    resetEyelids();
                }
            };
            requestAnimationFrame(animateBlink);
        }, Math.random() * 2000 + 1000); // Random interval for blinking

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    const resetEyelids = () => {
        if (topEyelidRef.current && bottomEyelidRef.current) {
            topEyelidRef.current.position.set(...calculateEyelidPosition(sphereRadius)); // Reset top eyelid
            bottomEyelidRef.current.position.set(...calculateEyelidPosition(-sphereRadius)); // Reset bottom eyelid
        }
    };

    useFrame(() => {
        // Can add more features or camera controls here if needed
    });

    return (
        <>
            <mesh ref={meshRef} position={position} onClick={() => setShowNav(prev => !prev)}>
                <sphereGeometry args={[sphereRadius, 32, 32]} />
                <meshStandardMaterial attach="material" color="silver" metalness={0.5} roughness={0.5} />

                {/* Top eyelid */}
                <mesh ref={topEyelidRef} position={calculateEyelidPosition(sphereRadius)}>
                    {/* Using a cylinder to create a rounded eyelid shape */}
                    <cylinderGeometry args={[sphereRadius, sphereRadius, eyelidHeight, 6, 6, true, Math.PI / 1, Math.PI]} />
                    <meshStandardMaterial attach="material" color="brown" />
                </mesh>

                {/* Bottom eyelid */}
                <mesh ref={bottomEyelidRef} position={calculateEyelidPosition(-sphereRadius)}>
                    {/* Using a cylinder for a more rounded bottom eyelid */}
                    <cylinderGeometry args={[sphereRadius, sphereRadius, eyelidHeight, 6, 6, true, Math.PI / 1, Math.PI]} />
                    <meshStandardMaterial attach="material" color="brown" />
                </mesh>

                {/* Navbar toggle */}
                {showNav && (
                    <Html position={[position[0] - 10, position[1] + 2, position[2]]}>
                        <Navbar />
                    </Html>
                )}
            </mesh>
        </>
    );
};

export default Companion;
