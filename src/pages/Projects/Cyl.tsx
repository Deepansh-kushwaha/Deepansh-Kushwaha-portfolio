import{useTexture} from "@react-three/drei"
import img from "../../assets/texture2.png"
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


function Cyl() {
    const tex = useTexture(img);
 

    const cyl = useRef(null);
    useFrame((_state,delta) => {
        if (cyl.current) {
            (cyl.current as THREE.Mesh).rotation.y += delta;
        }
    })
  return (
    <group rotation={[0,1.4,0.5]} >

        <mesh ref={cyl} >
        
         <cylinderGeometry args={[1,1,1,30, 30, true]}/>
           <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
       
        </mesh>
    </group>
  )
}

export default Cyl
