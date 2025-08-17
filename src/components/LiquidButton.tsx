import { useRef } from "react";
import gsap from "gsap";
import "../pages/Home/Home.css"
import { Link } from "react-router";


interface Props {
    text: string,
    color: string,
    link: string,
    layout: string,
    textclass: string
}

export default function CircleFillButton(props: Props) {
  const size = `relative overflow-hidden flex items-center justify-center ${props.layout}`;
  const fillRef = useRef(null);
  const buttonRef = useRef(null);
   const handleEnter = () => {
    // Hide button's own background immediately
    gsap.set(buttonRef.current, { backgroundColor: "white"});
   
    // Animate fill from bottom
    gsap.fromTo(
      fillRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.6, ease: "power2.out" }
    );
  };

  const handleLeave = () => {

    // Animate fill disappearing
    gsap.to(fillRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setTimeout(() => {
          // Show button's own background
          gsap.set(buttonRef.current, { backgroundColor: props.color });
        } ,200)
        // Restore original background color after animation
        
      }
    });
  };


  return (
    <Link to={props.link} target="_blank">
    <button
     ref={buttonRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={size}
    >
      {/* Animated background layer */}
      <span
        ref={fillRef}
        className="absolute inset-0 z-0 rounded-full"
        style={{ backgroundColor: props.color }}
      ></span>

      {/* Text layer (always above) */}
      <span className=" z-10 relative "><i className={props.textclass}>{props.text}</i></span>
    </button>
    </Link>
  );
}
