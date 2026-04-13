import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import Magnetic from "./Magnetic"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  // Track scroll for background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItemClass = (path: string) => `
    relative label-md px-4 py-2 
    transition-all duration-500 
    ${location.pathname === path ? "text-[var(--primary)] font-bold" : "text-[var(--on-surface)] opacity-50 hover:opacity-100"}
    block text-center z-10
  `
  
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
      scrolled ? "py-4" : "py-8"
    }`}>
      <div className="container-editorial flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="relative z-[110] group">
          <Magnetic strength={0.1}>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-xs ring-0 group-hover:ring-8 ring-[var(--primary)]/10 transition-all duration-500">
                DK
              </span>
              <span className="headline-lg text-xl tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                STUDIO
              </span>
            </div>
          </Magnetic>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-2 p-1.5 rounded-full transition-all duration-700 ${
          scrolled ? "glass soft-shadow border border-[var(--on-surface)]/5" : ""
        }`}>
          <ul className='flex gap-1 items-center'>
            {menuItems.map((item) => (
              <li key={item.path} className="relative">
                <Link to={item.path} className={navItemClass(item.path)}>
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="navTab"
                      className="absolute inset-0 bg-[var(--surface-container-high)] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="w-[1px] h-4 bg-[var(--on-surface)]/10 mx-2" />
          
          <Magnetic strength={0.2}>
            <Link 
              to="/contact" 
              className="label-md px-6 py-3 bg-[var(--on-surface)] text-[var(--surface)] hover:bg-[var(--primary)] hover:text-white rounded-full transition-all duration-500 flex items-center gap-2"
            >
              Start Project <i className="ri-arrow-right-up-line"></i>
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden relative z-[110]">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              isOpen ? "bg-[var(--on-surface)] text-white rotate-90" : "glass border border-[var(--on-surface)]/10"
            }`}
          >
            <i className={isOpen ? "ri-close-line text-xl" : "ri-menu-4-line text-xl"}></i>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[var(--surface)] z-[105] md:hidden flex flex-col justify-center p-12"
            >
              <div className="absolute inset-0 dot-grid-svg opacity-30" />
              <ul className='flex flex-col gap-6 relative z-10'>
                {menuItems.map((item, i) => (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                  >
                    <Link 
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="display-lg text-5xl hover:text-[var(--primary)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12"
                >
                  <Link 
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full justify-center py-6 text-xl"
                  >
                    Start a Project <i className="ri-arrow-right-up-line"></i>
                  </Link>
                </motion.li>
              </ul>
              
              <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end opacity-40">
                <p className="label-md">© 2024 DEEPANSH STUDIO</p>
                <div className="flex gap-4">
                  <i className="ri-instagram-line text-xl"></i>
                  <i className="ri-twitter-x-line text-xl"></i>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
