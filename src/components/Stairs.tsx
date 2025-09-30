import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router";


interface StairsProps {
  children?: React.ReactNode;
}

const Stairs = (props: StairsProps) => {
    const locate = useLocation().pathname;
    const stairParentRef = useRef(null);
    const pageRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();
     tl.to(stairParentRef.current, {
      display: "block"
    })
    tl.from(".stair", {
      height: 0,
      stagger :{
        amount: -0.3,
      }
    })
    tl.to(".stair", {
      y: "100%" ,
      stagger :{
        amount: -0.3,
      }
    })
    tl.to(stairParentRef.current, {
      display: "none"
    })
     tl.to(".stair", {
      y: "0" ,
      
    })

    gsap.from(pageRef.current, {
        opacity: 0,
        delay: 1,
        
    })

  },[locate]);
  return (
    <div>
        <div>

      <div ref={stairParentRef} className="h-screen w-full fixed z-20 top-0">
        <div className="h-full w-full flex">
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
        </div>
        </div>
        </div>
        <div ref={pageRef} > 
           {props.children}
        </div>
    </div>
  )
}


export default Stairs
