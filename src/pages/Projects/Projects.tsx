import { Link } from "react-router"
import "./project.css"
import Card from "../../components/Card"
import Magnetic from "../../components/Magnetic"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
function Projects() {
  const project = [
    {
      image1: "src/assets/cyberpunk.png",
      image2: "src/assets/cuberto.png",
    },
    {
      image1: "src/assets/cyberpunk.png",
      image2: "src/assets/cuberto.png",
    },
    {
      image1: "src/assets/cyberpunk.png",
      image2: "src/assets/cuberto.png",
    },
  ]

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(".project-row", {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".project-list",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })
  })

  return (
    <main className="bg-[var(--surface)] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-24">
        <header className="mb-24 reveal stagger-1">
          <p className="label-md text-[var(--primary)] mb-4">Curated Portfolio</p>
          <h1 className="display-lg">SELECTED <br/><span className="text-[var(--primary)]">WORKS</span></h1>
        </header>

        <section className="project-list flex flex-col gap-20 md:gap-24">
          {project.map((elem, i) => (
            <div key={i} className="project-row h-auto md:h-[80vh]">
              <Card image1={elem.image1} image2={elem.image2} />
            </div>
          ))}
        </section>


        <section className="mt-32 md:mt-48 h-[60vh] flex flex-col justify-center items-center text-center bg-[var(--surface-container-low)] rounded-[3rem] p-12">
            <p className="label-md text-[var(--primary)] mb-6">Collaboration</p>
            <h2 className="headline-lg mb-12">Have a project in mind?</h2>
            <Magnetic strength={0.3}>
                <Link to="/contact" className="btn-primary py-4 px-12 text-lg">
                    Let's Connect <i className="ri-mail-send-line"></i>
                </Link>
            </Magnetic>
        </section>
      </div>
    </main>
  )
}

export default Projects
