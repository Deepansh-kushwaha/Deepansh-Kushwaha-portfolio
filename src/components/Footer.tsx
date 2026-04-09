import { Link } from "react-router";
import logo from "../assets/footer-logo.png";

function Footer() {
  const linkClass: string = "label-md opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-all cursor-pointer block mb-2"
  
  return (
    <footer className="w-full bg-[var(--surface-container-low)] rounded-t-[4rem] px-10 pt-20 pb-10 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mb-20 text-left">
          <div className="space-y-6">
            <h2 className="headline-lg text-sm text-[var(--primary)] mb-8">Navigation</h2>
            <nav>
              <ul className="space-y-3">
                <li><Link to="/" className={linkClass}>Home</Link></li>
                <li><Link to="/projects" className={linkClass}>Projects</Link></li>
                <li><Link to="/about" className={linkClass}>About</Link></li>
                <li><Link to="/certification" className={linkClass}>Certificates</Link></li>
              </ul>
            </nav>
          </div>

          <div className="space-y-6">
            <h2 className="headline-lg text-sm text-[var(--primary)] mb-8">Contact</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 opacity-80 body-lg">
                <i className="ri-mail-line text-[var(--primary)] mt-1 shrink-0 w-6"></i>
                <span className="break-all">deepanshkushwaha9@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 opacity-80 body-lg">
                <i className="ri-map-pin-line text-[var(--primary)] mt-1 shrink-0 w-6"></i>
                <span>Uttar Pradesh, INDIA</span>
              </li>
            </ul>
          </div>


          <div className="flex flex-col items-start md:items-end">
            <img src={logo} className="w-48 mb-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-500" alt="Logo" />
            <p className="label-md opacity-40 text-left md:text-right">
              Architecting fluid digital <br/> experiences since 2024.
            </p>
          </div>
        </div>

        <div className="pt-10 border-t border-[var(--on-surface)]/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="label-md opacity-30">© 2025 Deepansh Kushwaha</span>
          <div className="flex gap-6">
             <i className="ri-bard-line text-[var(--primary)] opacity-40"></i>
             <span className="label-md opacity-30 italic">Designed with fluidity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
