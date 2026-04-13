import { Link } from "react-router"
import "./project.css"
import Magnetic from "../../components/Magnetic"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
function Projects() {
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
    <main className="bg-[var(--surface)] min-h-screen pt-32 pb-24 flex flex-col justify-between">
      <div className="container mx-auto px-6 md:px-24">
        <header className="mb-24 reveal stagger-1">
          <p className="label-md text-[var(--primary)] mb-4">Curated Portfolio</p>
          <h1 className="display-lg">SELECTED <br/><span className="text-[var(--primary)] text-outline-primary">WORKS</span></h1>
        </header>

        {/* Coming Soon Section */}
        <section className="h-[50vh] flex flex-col justify-center items-start relative overflow-hidden group">
            <div className="reveal stagger-2">
                <h2 className="display-lg text-[15vw] leading-none opacity-10 uppercase tracking-tighter hover:opacity-100 transition-opacity duration-1000 cursor-default">
                    Coming <br/> Soon
                </h2>
                <div className="mt-8 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-[var(--primary)]"></span>
                    <p className="label-md opacity-40">Curating the next digital symphony. Stay tuned.</p>
                </div>
            </div>
            
            {/* Visual fluff for depth */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/10 blur-[120px] rounded-full group-hover:bg-[var(--primary)]/20 transition-all duration-1000"></div>
        </section>

        <section className="mt-32 md:mt-48 h-[60vh] flex flex-col justify-center items-center text-center bg-[var(--surface-container-low)] rounded-[3rem] p-12">
            <p className="label-md text-[var(--primary)] mb-6">Collaboration</p>
            <h2 className="headline-lg mb-12 uppercase tracking-tight">Have a challenge <br/> for the studio?</h2>
            <Magnetic strength={0.3}>
                <Link to="/contact" className="btn-primary py-6 px-16 text-xl rounded-full">
                    Start A Project <i className="ri-arrow-right-line"></i>
                </Link>
            </Magnetic>
        </section>
      </div>
    </main>
  )
}


export default Projects
