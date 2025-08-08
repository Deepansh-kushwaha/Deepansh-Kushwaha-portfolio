import { Link } from "react-router"


function Navbar() {
  return (
    <nav className='nav text-[#ffffff] p-2 mt-10 ' >
      <ul className='flex gap-18 justify-center font-poppins font-extraligtht items-center drop-shadow-[0_15px_0.5rem_rgba(255,255,255,255)]'>
     <Link to="/"><li >Home</li></Link>
     <Link to="/projects"><li >Projects</li></Link>
     <Link to="/about"><li>About</li></Link>
     <Link to="/contact"><li>Certifications</li></Link>
      </ul>
      
    </nav>
  )
}

export default Navbar
