import logo from "../assets/footer-logo.png";
function Footer() {
    const hovereffect:string ="hover:underline text-sm m-1 cursor-pointer hover:text-gray-100 " 
  return (
    <>
      <div className="text-white flex flex-col justify-around mt-15 bg-[#000000] rounded-t-[5rem]  shadow-[0_-10px_24px_-13px_rgba(255,255,255,0.6)]">
        <div className="flex justify-around items-center ">

        <div id="1" className=" text-left">
          <h1 className="text-3xl font-bold">More Pages</h1>
          <div className="m-1">
            <ul>
              <li className={hovereffect}>Home</li>
              <li className={hovereffect}>Projects</li>
              <li className={hovereffect}>About</li>
              <li className={hovereffect}>Skills</li>
              <li className={hovereffect}>Certificates</li>
            </ul>
          </div>
        </div>
        <div id="2" className=" text-left">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <div className="m-1">
            <ul>
              <li className={hovereffect}><i className="ri-mail-line"></i> deepanshkushwaha9@gmail.com</li>
              <li className={hovereffect}><i className="ri-phone-line"></i> +91 7217429310</li>
              <li className={hovereffect}><i className="ri-map-pin-line"></i> Uttar Pradesh, INDIA</li>
            </ul>
          </div>
        </div>
        <div id="3">
          <img src={logo} className="w-[15rem] cursor-pointer " alt="Deepansh kushwaha logo" />
        </div>
      </div>
        <div className="flex flex-col justify-center items-center">
      <hr  className="text-white h-1 w-6xl " />
      <span className="text-white  text-xs text-center p-2">© 2025 Deepansh Kushwaha</span>
        </div>
        </div>
    </>
  );
}

export default Footer;
