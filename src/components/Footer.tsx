import { Link } from "react-router";

function Footer() {
  const linkClass: string = "label-md opacity-40 hover:opacity-100 hover:text-[var(--primary)] transition-all cursor-pointer block mb-4 tracking-widest text-sm"
  
  return (
    <footer className="w-full bg-[var(--surface-container-low)] rounded-t-[4rem] md:rounded-t-[6rem] px-8 md:px-24 pt-32 pb-12 mt-40 border-t border-[var(--on-surface)]/5">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 items-start mb-32">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <h2 className="display-lg text-4xl mb-8 uppercase">DEEPANSH <br/> <span className="text-outline-primary italic">STUDIO</span></h2>
            <p className="body-lg max-w-sm opacity-40 leading-relaxed mb-12 italic">
              "We architect fluid digital symphonies for brands that refuse to blend in. A boutique collective dedicated to the intersection of code and art."
            </p>
            <div className="flex gap-4">
               {["ri-linkedin-box-line", "ri-github-line", "ri-instagram-line", "ri-twitter-x-line"].map((icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full border border-[var(--on-surface)]/10 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all">
                   <i className={icon}></i>
                 </a>
               ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="label-md text-[var(--primary)] mb-8 tracking-[0.5em]">Archives</h3>
            <nav>
              <ul className="space-y-0">
                <li><Link to="/" className={linkClass}>INDEX</Link></li>
                <li><Link to="/catalogue" className={linkClass}>CATALOGUE</Link></li>
                <li><Link to="/about" className={linkClass}>STUDIO</Link></li>
                <li><Link to="/certification" className={linkClass}>RECOGNITION</Link></li>
              </ul>
            </nav>
          </div>

          <div className="space-y-8">
            <h3 className="label-md text-[var(--primary)] mb-8 tracking-[0.5em]">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:deepanshkushwaha9@gmail.com" className="body-lg hover:text-[var(--primary)] transition-colors break-all block">
                  deepanshkushwaha9@gmail.com
                </a>
              </li>
              <li className="label-md opacity-30 mt-8">
                Uttar Pradesh, <br/> INDIA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[var(--on-surface)]/5 flex flex-col md:flex-row justify-between items-end md:items-center gap-12">
          <div className="flex flex-col gap-2">
            <span className="label-md opacity-20 text-[10px]">Architecture // 2024.1.0</span>
            <span className="label-md opacity-40">© 2025 DEEPANSH STUDIO ARCHIVE</span>
          </div>
          
          <div className="flex flex-col md:items-end gap-2">
            <div className="flex items-center gap-4">
               <span className="w-12 h-[1px] bg-[var(--on-surface)] opacity-10"></span>
               <span className="label-md opacity-40 italic">Designed with fluidity</span>
            </div>
            <p className="label-md text-[var(--primary)] text-[10px] animate-pulse">SYSTEMS ONLINE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
