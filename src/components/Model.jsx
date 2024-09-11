import React, { useEffect, useRef } from 'react'
import radian from '../utils/radian'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from "gsap"

const Model = () => {

    const orbitRef = useRef();

    useFrame((state)=>{
        if(orbitRef.current){
            const {x,y} = state.mouse;
            console.log(y * radian(90));
            
            orbitRef.current.setAzimuthalAngle(-x * radian(45));
            orbitRef.current.setPolarAngle((y+1)*radian(60));
            orbitRef.current.update();
        }
    })

    const ballRef = useRef(null);
    useEffect(()=>{
        const timeline = gsap.timeline();
       timeline.to(ballRef.current.position,{
           x: 1,
           duration: 2,
           ease:"power1.out",
       })

       timeline.to(ballRef.current.position,{
        y: 0.5,
        duration: 1,
        ease:"bounce.out",
    },"<")
        
    },[ballRef.current])
  return (
    <>
    <PerspectiveCamera makeDefault position={[0, 1, 5]} />
    <OrbitControls ref = {orbitRef} minPolarAngle={radian(30)} maxPolarAngle={radian(80)}/>
      <mesh position={[-0.5, 1.75, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="ffffff" metalness={0.2} roughness={0.3} />
      </mesh>

      <mesh rotation={[-radian(90), 0,0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#49c4ed" />
      </mesh>

      <ambientLight intensity={0.25} color={'#ffffff'} />
      <spotLight intensity={4} color={'#ffffff'} position={[-3, 1, 0]} distance={10} penumbra={0.3} angle={radian(30)} castShadow />

      <Environment background>
        <mesh>
          <sphereGeometry args={[100, 100, 100]} />
          <meshBasicMaterial color="#045a9c" side={THREE.BackSide}/>
        </mesh>
      </Environment>
    </>
  )
}

export default Model
