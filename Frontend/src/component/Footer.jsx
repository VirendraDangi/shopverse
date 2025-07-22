import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GoArrowRight } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

const FooterParallax = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

   bg.style.backgroundColor = 'rgb(32 30 28)'; // dark gray, stone feel

    gsap.fromTo(
      bg,
      {
        backgroundPosition: `50% ${-window.innerHeight * getRatio(section)}px`,
      },
      {
        backgroundPosition: `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center text-amber-50 px-4"
    >
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
      ></div>

      <h2 className=" text-5xl font-extrabold text-amber-50 absolute top-3 left-5 drop-shadow-md font-helvetica">
        Ready to Elevate <br /> Your Style?
      </h2>
      <p className="mt-4 max-w-2xl text-lg  absolute top-25 text-amber-50 left-3">
        Subscribe for exclusive deals and fresh <br /> drops from Alphane 
      </p>
  {/* <h1 className="absolute right-0 text-5xl text-amber-50 text-center font-helvetica font-bold top-4" >
    Our page has come to an end,<br /> but our relationship with you has not.
  </h1> */}

 <button
     className="group font-helvetica absolute top-48 left-5 cursor-pointer bg-green-600 px-4 py-2 rounded-3xl text-amber-50 flex items-center transition"
   >
     <span className="transform text-xl transition-all duration-300 group-hover:-translate-x-2">
     <a href="https://www.instagram.com/techburner/?hl=en">Contact us</a>  
     </span>
     <span className="ml-2 transform transition-all duration-300 group-hover:translate-x-2">
       <GoArrowRight size={20} />
     </span>
   </button>

<div className="w-full border-t border-[0.1px]  my-6"></div>

   <p className="mt-20 max-w-2xl text-lg  absolute  text-amber-50 left-3">
        Subscribe for exclusive deals and fresh <br /> drops from Alphane 
      </p>

      <div>
        <p className="text-lg right-3 space-x-6 absolute" >
         <button>
             <a href="/">Home</a>
            </button>  
            <button>
                    career
            </button>
           <button>
              About us
           </button>
        </p>
      </div>
   
     <div>
        <p className="text-lg right-3 mt-8 space-x-4 absolute" >
         <button>
              <a href="https://www.instagram.com/techburner/?hl=en">Contact</a>  
            </button>  
            <button>
                Solution
            </button>
           <button>
              <a href="https://in.linkedin.com/in/shlok-srivastava-730354125">Linkedin</a>
           </button>
        </p>
      </div>

     <h1 className="absolute text-[14rem] bottom-3 text-amber-50 " >SHOPVERSE</h1>
      <div className="mt-6 text-lg absolute bottom-2 right-2 text-amber-50">© 2025 Alphane Lab. All rights reserved.</div>
    </section>
  );
};

export default FooterParallax;
