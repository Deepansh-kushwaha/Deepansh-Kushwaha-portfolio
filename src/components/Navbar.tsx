import { useState } from "react"
import { Link, useLocation } from "react-router"
import { motion, AnimatePresence } from "framer-motion"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const navItemClass = (path: string) => `
    relative label-md px-6 py-3 md:py-2 md:px-4 
    transition-all duration-300 active:scale-95 
    ${location.pathname === path ? "text-[var(--primary)] font-bold" : "text-[var(--on-surface)] opacity-70 hover:opacity-100"}
    block text-center z-10
  `
  
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Certifications", path: "/certification" },
  ]

  return (
    <nav className='fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4'>
      <div className="relative w-full md:w-auto md:max-w-fit">
        {/* Desktop & Mobile Base */}
        <div className='glass soft-shadow flex items-center px-4 md:px-4 py-2 rounded-full border border-[var(--on-surface)]/5 min-h-[56px]'>
          <ul className='hidden md:flex gap-1 justify-center items-center ml-2'>
            {menuItems.map((item) => (
              <li key={item.path} className="relative">
                <Link to={item.path} className={navItemClass(item.path)}>
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[var(--primary)]/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link to="/contact" className={`label-md px-6 py-2.5 rounded-full transition-all duration-300 active:scale-95 flex items-center gap-2 ${
                location.pathname === '/contact' 
                ? 'bg-[var(--on-surface)] text-[var(--surface)]' 
                : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-container)] hover:text-black'
              }`}>
                Get in touch <i className="ri-arrow-right-line"></i>
              </Link>
            </li>
          </ul>



          <div className="md:hidden flex w-full justify-between items-center">
            <Link to="/" className="label-md font-bold px-2 text-[var(--primary)] text-xl">DK.</Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-2xl text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors"
            >
              <i className={isOpen ? "ri-close-line" : "ri-menu-5-line"}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 right-0 mt-2 md:hidden glass soft-shadow rounded-[2rem] p-6 border border-[var(--on-surface)]/5 min-w-[280px]"
            >
              <ul className='flex flex-col gap-4'>
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={navItemClass(item.path)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="mt-2">
                  <Link 
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`label-md px-6 py-4 rounded-full transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 ${
                      location.pathname === '/contact' 
                      ? 'bg-[var(--on-surface)] text-[var(--surface)]' 
                      : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-container)] hover:text-black'
                    }`}
                  >
                    Get in touch <i className="ri-arrow-right-line"></i>
                  </Link>
                </li>


              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </nav>
  )
}

export default Navbar

