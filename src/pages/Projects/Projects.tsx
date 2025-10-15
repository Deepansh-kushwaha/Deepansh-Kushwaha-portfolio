import { Canvas } from "@react-three/fiber"
import "./project.css"
import { OrbitControls } from "@react-three/drei"
import  Scene  from "./Cyl"
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing"
import Card from "../../components/Card"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
function Projects() {

  const project = [
    {
    image1:"src/assets/cyberpunk.png",
    image2:"src/assets/cuberto.png",
  },
    {
    image1:"src/assets/cyberpunk.png",
    image2:"src/assets/cuberto.png",
  },
    {
    image1:"src/assets/cyberpunk.png",
    image2:"src/assets/cuberto.png",
  },
]

gsap.registerPlugin(ScrollTrigger );

useGSAP(() => {
  gsap.from(".hero",{
    height: 1,
    stagger:{
      amount: 0.5,

    },
    scrollTrigger: {
      trigger: ".lol",
      markers: true,
      start: "top 100%",
      end: "top -150%",
      scrub: true
    }
  })
})

  return (<>
  <div className="wrapper">

    <Canvas  className="w-full h-screen" flat  camera={{fov:30}}>
      <OrbitControls enableDamping enableZoom={false} />
      <ambientLight/>
      <directionalLight intensity={0.8} position={[0,-1,4]}/>
      <Scene />  
      <EffectComposer >
      <Bloom
      mipmapBlur // Enables or disables mipmap blur.
      intensity={1.0} // The bloom intensity.  
      luminanceThreshold={0.8} // luminance threshold. Raise this value to mask out darker elements in the scene.
      luminanceSmoothing={0.0205} // smoothness of the luminance threshold. Range is [0, 1]
      />
      <ToneMapping adaptive />
      </EffectComposer>
      
      </Canvas>
    <div>
      <div>
      <h1 className="text-[20vh] font-[font3] text-white font-bold">Projects 2.0</h1>
      </div>
    </div>
    <div className="-mt-5 lol">
      {project.map( (elem ,i) =>(
         <div key={i}  className="hero w-full h-[80vh] mb-5  flex gap-3">
        <Card image1={elem.image1} image2={elem.image2}/>
        </div>
        ))}

      </div>
      </div>
    </>
  )
}

export default Projects
