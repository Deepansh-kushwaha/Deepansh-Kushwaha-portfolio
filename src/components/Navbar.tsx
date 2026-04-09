import { useState } from "react"
import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navItemClass: string = "label-md px-6 py-3 md:py-2 md:px-4 hover:bg-[var(--surface-container)] rounded-full transition-all duration-300 active:scale-95 text-[var(--on-surface)] block text-center"
  
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
          <ul className='hidden md:flex gap-1 justify-center items-center'>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={navItemClass}>
                  {item.name}
                </Link>
              </li>
            ))}
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
                      className={navItemClass}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </nav>
  )
}

export default Navbar

