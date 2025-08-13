import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = [
    "नमस्ते",      // Hindi
    "Hello",       // English
    "Hola",        // Spanish
  "Bonjour",     // French
  "Hallo",       // German
  "Ciao",        // Italian
  "こんにちは",  // Japanese
  "안녕하세요",    // Korean
  "Olá",         // Portuguese
  "Привет"       // Russian
];

const Loader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(loaderRef.current, 
      { scaleY:0 ,transformOrigin: "bottom" },
      { scaleY:1, duration: 0.6, ease: "power2.out" }
    )
    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }
    )
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.1,
        ease: "power2.in",
        delay: 1
      })
      .eventCallback("onRepeat", () => {
        setCurrentIndex((prev) => (prev + 1) % greetings.length);
      });

    return () => {
      tl.kill();
    };
  }, []);


  window.onload = function() {
      const loaderElem = document.getElementById("loader");
      if (loaderElem) {
        loaderElem.style.display = "flex";
      }

      setTimeout(() => {
        if (loaderElem) {
          loaderElem.style.display = "none";
        }
      }, 4000);
  }
  return (<>
    
    <div ref={loaderRef} id="loader" className=" justify-center items-center h-screen hidden absolute w-full z-50 bg-[#000000]">
      <div 
        ref={textRef}
        className="text-4xl font-bold text-white tracking-wide"
        >
        {greetings[currentIndex]}
      </div>
    </div>
          </>
  );
};

export default Loader;
