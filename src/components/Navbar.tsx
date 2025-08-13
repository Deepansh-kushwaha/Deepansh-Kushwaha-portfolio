import { Link } from "react-router"


function Navbar() {
 const hoverborder:string ="hover:border-b rounded-full px-3 py-1 hover:bg-gray-800 border-white active:scale-95  transition-transform duration-100 hover:shadow-[inset_0_6px_8px_-6px_rgba(255,255,255,0.6)]"
  return (
    <nav className='nav text-[#ffffff] p-2 mt-8 absolute top-0 left-0 right-0 z-10 px-40 ' >
      <ul className=' flex gap-18 justify-center font-poppins text-base font-extraligtht items-center mx-40 h-13 rounded-full backdrop-blur-lg shadow-[inset_0_6px_8px_-6px_rgba(255,255,255,0.6)]'>
        <Link to="/"><li className={hoverborder}>Home</li></Link>
        <Link to="/projects"><li className={hoverborder}>Projects</li></Link>
        <Link to="/about"><li className={hoverborder}>About</li></Link>
        <Link to="/contact"><li className={hoverborder}>Certifications</li></Link>
      </ul>

    </nav>
  )
}

export default Navbar
