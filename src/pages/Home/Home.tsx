// import Scrollable from "../components/Scrollable"
import Loader  from "../../components/Loader";
import "./Home.css";
import Footer from "../../components/Footer";
import LiquidButton from "../../components/LiquidButton";
import Swiperslide from "../../components/swiperslide/Swiperslide";
import SkillsSection from "../../components/SkillsSection";
import Magnetic from "../../components/Magnetic";
import MouseFollower from "../../components/MouseFollower";

function Home() {
   

  return (
    <>
    <Loader />
    <main className="bg-gradient-to-b from-gray-950 via-black to-gray-950 "> 

      <section className="hero dot-grid-svg  h-screen flex  ">
        <div
          className="flex items-center justify-center min-h-98 relative overflow-hidden w-full "
          id="Hero"
        >
          <div className="relative flex flex-col items-center text-white z-10 ">
            <div className="relative z-2 p-11">
              <Magnetic strength={0.1}>
              <h1 className="text-9xl mr-[25rem] md:text-8xl font-extrabold leading-18 tracking-tighter bg-[url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png')] bg-center text-clip pb-1  cursor-pointer">
                
                DEEPANSH
              </h1>
              
              </Magnetic>
              <p className="text-base sm:text-lg font-light mr-75 text-center">
                Simmmmmply
              </p>
            </div>

            <div className="relative -mt-8 sm:-mt-12 z-2 ">
              <p className="text-base text-center ml-75  sm:text-lg font-light">
                Awwwwwsome
              </p>
              <Magnetic strength={0.1}>
              <h1 className="text-9xl ml-[25rem]  md:text-8xl font-extrabold leading-14 tracking-tighter bg-[url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png')] text-clip pb-4 cursor-pointer ">
                KUSHWAHA
              </h1>
              </Magnetic>
            </div>
          </div>
        </div>
          <MouseFollower
        imgSrc="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNqdjRha2E5b3hlbWJlNndweTQxY3czcTFiMXZ1bTdqbXc2bDVsMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Vf3ZKdillTMOOaOho0/giphy.gif"
        size={200}
        skewAmount={15}
        blurIntensity={3}
        glowColor="rgba(255,255,255,0)"
        stiffness={100}
        damping={30}
      />
      </section>
      {/* <Scrollable /> */}

      <section className="p-10 flex flex-col justify-center min-h-screen ">
        <h1 className="mt-20 text-7xl text-white text-center font-poppins font-extrabold">
          Projects{" "}
        </h1>
        <Swiperslide/>
       
        <div className="flex items-center justify-center">

          <Magnetic strength={1}>
          <LiquidButton
            text="View more"
            textclass="ri-arrow-right-line font-bold font-poppins text-white"
            color={"#FF5E5E"}
            layout="linkbutton"
            link="/projects"
            />
            </Magnetic>
        </div>
      </section>

      <SkillsSection/>
      <section className="min-h-screen flex flex-col justify-center">
        <h1 className="mt-20 text-7xl text-white text-center font-poppins font-extrabold">
          Get In Touch
        </h1>
        <div className="socials flex items-center justify-center gap-30 mt-10">
          <Magnetic strength={1}>

          <LiquidButton
            text=""
            textclass="ri-linkedin-box-line logos "
            color={"#BBBAFF"}
            layout="social-container"
            link="https://www.linkedin.com/in/deepansh-kushwaha"
            />
            </Magnetic>
            <Magnetic strength={1}>

          <LiquidButton
            text=""
            textclass="ri-github-line logos"
            color={"#92FF8D"}
            layout="social-container"
            link="https://github.com/Deepansh-kushwaha"
            />
            </Magnetic>
            <Magnetic strength={1}>

          <LiquidButton
            text=""
            textclass="ri-instagram-line logos"
            color={"#FFFCA5"}
            layout="social-container"
            link="https://instagram.com/deepansh_kushwaha"
            />
            </Magnetic>
            <Magnetic strength={1}>

          <LiquidButton
            text=""
            textclass="ri-mail-line logos"
            color={"#FF7373"}
            layout="social-container"
            link="mailto:deepanshkushwaha9@gmail"
            />
            </Magnetic>
        </div>
        <Footer />
      </section>
            </main>
    </>
  );
}

export default Home;
