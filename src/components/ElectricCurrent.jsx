
import * as THREE from 'three'; 
import { useEffect, useRef } from 'react'; 

const ElectricCurrent = () => {     
    const points = [];     
    const count = 5000;      

    // Generate the points for the current
    for (let i = 0; i < count; i++) {         
        const x = Math.sin(i * 200) * -100; // Adjust for your desired movement         
        const y = Math.cos(i * 900) * 1000;         
        const z = Math.sin(i * 2000) * -200;         
        points.push(new THREE.Vector3(x, y, z));     
    } 

    const geometry = new THREE.BufferGeometry().setFromPoints(points); 
    const material = new THREE.LineBasicMaterial({ color: 0xffffff }); // Use LineBasicMaterial for lines
    const lineRef = useRef();      

    useEffect(() => {       
        const raycaster = new THREE.Raycaster();       
        const meshes = []; // Make sure to have your rotating meshes in this array

        const animate = () => {         
            requestAnimationFrame(animate);         
            const time = Date.now() * 0.008; // Correct method to get time         
            const pulseColor = new THREE.Color(); // Correct instantiation of THREE.Color 
            pulseColor.setHSL((Math.sin(time) + 5) / 10, 1, 0.1); // Adjust saturation and lightness 

            // Raycasting logic         
            for (let i = 0; i < count; i++) {           
                const from = points[i];           
                const to = points[i + 5] || points[0]; // Loop back to the first point if at end           
                raycaster.set(from, to.clone().sub(from).normalize());                      

                const intersects = raycaster.intersectObjects(meshes); // Use intersectObjects 

                // Change color when a collision occurs
                if (intersects.length > 0) {             
                    material.color.set(0xff0000);           
                } else {             
                    material.color.copy(pulseColor);           
                }         
            };          

            if (lineRef.current) {           
                lineRef.current.material.color.copy(material.color);         
            }       
        };       
        animate();     
    }, [material, points]);   

    return (     
        <>     
            <line ref={lineRef} geometry={geometry} material={material}/>     
        </>   
    ); 
};  

export default ElectricCurrent;