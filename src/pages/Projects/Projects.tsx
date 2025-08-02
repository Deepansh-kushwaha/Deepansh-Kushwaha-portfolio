import { Canvas } from "@react-three/fiber"
import "./project.css"
import { OrbitControls } from "@react-three/drei"
import  Scene  from "./Cyl"
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing"

function Projects() {
  return (<>
    <Canvas  className="w-full h-screen" flat  camera={{fov:30}}>
      <OrbitControls enableDamping enableZoom={false} />
      <ambientLight/>
      <directionalLight intensity={0.8} position={[0,-1,4]}/>
      <Scene />  
      <EffectComposer >
      <Bloom
    mipmapBlur // Enables or disables mipmap blur.
    intensity={3.0} // The bloom intensity.
    luminanceThreshold={0.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
    luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
    <ToneMapping adaptive />
    </EffectComposer>
    
    </Canvas>
    <div>
      <h1 className="text-3xl text-white text-center italic font-extrabold">Welcome to My Projects</h1>
    </div>
    </>
  )
}

export default Projects
