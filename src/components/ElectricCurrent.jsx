import * as THREE from 'three';
const ElectricCurrent = () => {
    const points = [];
    const count = 100;

    for(let i=0; i< count; i++){
        const x = Math.sin(i*0.2)*5// Adjust for your desired movement
        const y = Math.cos(i * 0.3)*5;
        points.push(new THREE.Vector3(x,y,0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color:0x00ffcc});
  return (
    <line geometry={geometry} material={material}/>
  );
};

export default ElectricCurrent