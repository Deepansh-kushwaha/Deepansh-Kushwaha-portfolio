import { Link } from "react-router"
import logo from "../assets/logo.png"

function Navbar() {
  return (
    <nav className='nav bg-gray-800 text-zinc-50 p-2 flex '>
        <div className="flex-1">
            <img src={logo} alt="Deepansh Kushwaha" className="w-10 h-10 bg-amber-50 rounded-2xl" />
        </div>
      <ul className='flex gap-4 flex-1 justify-center items-center'>
     <Link to="/"><li>Home</li></Link>
     <Link to="/projects"><li>Projects</li></Link>
     <Link to="/about"><li>About</li></Link>
     <Link to="/contact"><li>Contact</li></Link>

      </ul>
      <div className="flex-1 flex justify-end items-center">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
