import { Link } from "react-router";
import "./Home.css";
import Footer from "../../components/Footer";
import Swiperslide from "../../components/swiperslide/Swiperslide";
import SkillsSection from "../../components/SkillsSection";
import Magnetic from "../../components/Magnetic";
import MouseFollower from "../../components/MouseFollower";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";

function Home() {
  return (
    <>
      <main className="bg-[var(--surface)] text-[var(--on-surface)] selection:bg-[var(--primary)] selection:text-white">
        <section className="hero dot-grid-svg h-screen flex relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-24 flex flex-col justify-center h-full relative z-10">
            <div className="reveal stagger-1">
              <p className="label-md text-[var(--primary)] mb-4">Personal Portfolio</p>
              <h1 className="display-lg max-w-4xl">
                DEEPANSH <br />
                <span className="text-[var(--primary)] text-outline-primary">KUSHWAHA</span>
              </h1>
            </div>

            <div className="reveal stagger-2 mt-12 md:max-w-md">
              <p className="body-lg text-[var(--on-surface)] opacity-80">
                Curating digital experiences through intentional design and fluid motion. A sommelier of code and aesthetics.
              </p>
            </div>

            <div className="reveal stagger-3 mt-16">
              <Magnetic strength={0.1}>
                <Link to="/about" className="btn-primary">
                  Explore Work <i className="ri-arrow-right-up-line"></i>
                </Link>
              </Magnetic>
            </div>
          </div>

          <MouseFollower />
        </section>

        <section id="features" className="bg-[var(--surface)]">
          <SkillsSection />
        </section>

        <section id="projects" className="p-10 md:p-24 flex flex-col justify-center min-h-screen bg-[var(--surface-container-low)]">
          <div className="reveal stagger-1 mb-16">
            <p className="label-md text-[var(--primary)]">Curated Selection</p>
            <h2 className="headline-lg">Selected Projects</h2>
          </div>

          <div className="reveal stagger-2">
            <Swiperslide />
          </div>

          <div className="flex items-center justify-center mt-20 reveal stagger-3">
            <Magnetic strength={1}>
              <Link to="/projects" className="btn-primary">
                View All Projects <i className="ri-arrow-right-line"></i>
              </Link>
            </Magnetic>
          </div>
        </section>

        <Testimonials />

        <section className="min-h-screen flex flex-col justify-center items-center text-center p-10 md:p-24 relative overflow-hidden">
          <div className="reveal stagger-1">
            <p className="label-md text-[var(--primary)] text-center">Inquiries</p>
            <h2 className="display-lg text-center mb-16">Let's Create<br />Something Fluid</h2>
          </div>

          <div className="reveal stagger-2 flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-10">
            <Magnetic strength={0.5}>
              <a href="https://www.linkedin.com/in/deepansh-kushwaha" target="_blank" rel="noreferrer"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-linkedin-box-line"></i>
              </a>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a href="https://github.com/Deepansh-kushwaha" target="_blank" rel="noreferrer"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-github-line"></i>
              </a>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a href="https://instagram.com/deepansh_kushwaha" target="_blank" rel="noreferrer"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a href="mailto:deepanshkushwaha9@gmail.com"
                className="glass soft-shadow p-8 rounded-full text-4xl hover:text-[var(--primary)] transition-colors">
                <i className="ri-mail-line"></i>
              </a>
            </Magnetic>
          </div>
        </section>

        <Newsletter />

        <div className="mt-20 w-full relative z-10">
          <Footer />
        </div>
      </main>
    </>
  );
}

export default Home;

