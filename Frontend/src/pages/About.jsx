import React, { useRef, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { GoArrowRight } from "react-icons/go";
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import SplitScreenPinning from '../component/SplitScreenPinning';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import ParallaxSections from '../component/ParallaxSection';
import Footer from '../component/Footer';

gsap.registerPlugin(SplitText, ScrollTrigger)


const About = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null); // Ref for text container in section 2
  const imagesRef = useRef([]); // Ref for images in section 2

  // LENIS smooth scroll setup with proper cleanup
  useEffect(() => {
    const lenis = new Lenis();
    let animationFrameId;
    
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    
    animationFrameId = requestAnimationFrame(raf);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // split text
  useEffect(() => {
    const runAnimation = () => {
      if (!headingRef.current || !paraRef.current || !buttonRef.current) return;

      // Create a GSAP context for better cleanup
      const ctx = gsap.context(() => {
        // Hide elements initially to prevent flash
        gsap.set([headingRef.current, paraRef.current, buttonRef.current], {
          visibility: 'hidden'
        });

        // Heading animation (split text)
        const splitInstance = new SplitText(headingRef.current, { type: 'chars' });
        
        // Show heading before animating
        gsap.set(headingRef.current, { visibility: 'visible' });
        
        // Animate characters
        gsap.from(splitInstance.chars, {
          x: 150,
          opacity: 0,
          duration: 0.7,
          ease: "power4",
          stagger: 0.04,
          onComplete: () => {
            // Clean up split text after animation
            splitInstance.revert();
          }
        });

        // Paragraph animation
        gsap.to(paraRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          // Show element before animating
          onStart: () => gsap.set(paraRef.current, { visibility: 'visible' })
        });

        // Button animation
        gsap.to(buttonRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.6,
          ease: 'power3.out',
          // Show element before animating
          onStart: () => gsap.set(buttonRef.current, { visibility: 'visible' })
        });
      }, sectionRef); // Scope context to sectionRef

      return () => ctx.revert();
    };

    // Wait for fonts to load if possible
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runAnimation);
    } else {
      runAnimation();
    }
  }, []);
   
  // setion-2
     useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the text container
      ScrollTrigger.create({
        trigger: textContainerRef.current,
        start: "top top",
        end: "+=230%",
        pin: true,
        pinSpacing: false,
        markers: true // Set to true for debugging
      });

      // Image animations
      imagesRef.current.forEach((img, i) => {
        gsap.fromTo(img,
          { y: i % 2 === 0 ? 100 : -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "top center",
              scrub: true,
              markers: false // Set to true for debugging
            }
          }
        );
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="overflow-x-hidden">
        {/* Section 1 */}
     <div className="w-full h-screen bg-amber-50 flex flex-col items-center justify-center pb-40">
  <h1
    ref={headingRef}
    className="font-helvetica font-bold text-7xl mb-6"
    style={{ visibility: 'hidden' }}
  >
    About us
  </h1>

  <p
    ref={paraRef}
    className="font-helvetica text-xl text-center mb-6 px-4"
    style={{
      opacity: 0,
      transform: 'translateY(30px)',
      visibility: 'hidden',
    }}
  >
    ShopVerse is a startup based in New Delhi, developing old <br /> skool shoe and offering testing services
  </p>

  <button
    ref={buttonRef}
    className="group font-helvetica cursor-pointer bg-green-600 px-8 py-2 rounded-3xl text-white flex items-center transition"
    style={{
      opacity: 0,
      transform: 'translateY(30px)',
      visibility: 'hidden',
    }}
  >
    <span className="transform transition-all duration-300 group-hover:-translate-x-2">
      Contact us
    </span>
    <span className="ml-2 transform transition-all duration-300 group-hover:translate-x-2">
      <GoArrowRight size={20} />
    </span>
  </button>
</div>


        {/* Section 2 (unchanged) */}
     <div className="w-full h-[300vh] bg-amber-50 overflow-x-hidden ">
          <div  
    ref={textContainerRef} 
   >
            <h1 className='top-18 relative text-6xl w-full left-5 font-helvetica font-bold'>
              The ShopVerse team <br /> is dedicated to building <br /> old skool shoe
            </h1>
            <small className='top-20 leading-[1.3] text-sm relative w-full left-5 font-helvetica'>
              <span className="block">We are a diverse group with complementary backgrounds in engineering, chemistry, and business.</span>
              <span className="block">Together, we aim to help innovators accelerate their materials R&D by providing contract test</span>
              <span className="block">services and instrumentation that bridge current gaps in materials characterization</span>
            </small>
          </div>

          <div className='w-full relative'>
            <img
            ref={el => imagesRef.current[0] = el}
     className='w-[50vw] absolute right-2 rounded-xl' src="/team.jpg" alt="" />
            <img 
     ref={el => imagesRef.current[1] = el}
    className='w-[50vw] absolute left-5 top-[90vh] rounded-xl' src="/10002.avif" alt="" />
            <img   
       ref={el => imagesRef.current[2] = el}
     className='w-[50vw] absolute right-5 top-[180vh] rounded-xl' src="/work.jpg" alt="" />
          </div>
        </div>
      </div>
     <div className='flex items-center bg-amber-50 justify-center  mb-5' >
       <h1 className='text-4xl bg-amber-50 font-bold' >
        OUR LEADERSHIP TEAM
      </h1>
      
     </div>

      <p className='absolute left-[26%] bg-amber-50 text-center font-helvetica ' >
Meet the team behind the innovations and solutions that <br /> are transforming the industry
       </p>
       
  <div className='mt-20 bg-amber-50' >
        <SplitScreenPinning />
  </div>
  <div>
    {/* <ParallaxSections/> */}
  </div>

  <Footer/>
    </div>
  );
};

export default About;

// import React, { useRef, useEffect } from 'react';
// import Lenis from '@studio-freight/lenis';
// import { GoArrowRight } from "react-icons/go";
// import gsap from 'gsap';
// import { SplitText } from 'gsap/SplitText';
// import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

// gsap.registerPlugin(SplitText, ScrollTrigger); // Register ScrollTrigger

// const About = () => {
//   const headingRef = useRef(null);
//   const paraRef = useRef(null);
//   const buttonRef = useRef(null);
//   const sectionRef = useRef(null);
//   const textContainerRef = useRef(null); // Ref for text container in section 2
//   const imagesRef = useRef([]); // Ref for images in section 2

//   // LENIS smooth scroll setup with ScrollTrigger integration
//   useEffect(() => {
//     const lenis = new Lenis();
    
//     lenis.on('scroll', ScrollTrigger.update);
    
//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000);
//     });
    
//     gsap.ticker.lagSmoothing(0);
    
//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   // GSAP animations setup
//   useEffect(() => {
//     const runAnimation = () => {
//       if (!headingRef.current || !paraRef.current || !buttonRef.current) return;

//       const ctx = gsap.context(() => {
//         // Initial setup
//         gsap.set([headingRef.current, paraRef.current, buttonRef.current], {
//           visibility: 'hidden'
//         });

//         // Heading animation
//         const splitInstance = new SplitText(headingRef.current, { type: 'chars' });
//         gsap.set(headingRef.current, { visibility: 'visible' });
        
//         gsap.from(splitInstance.chars, {
//           x: 150,
//           opacity: 0,
//           duration: 0.7,
//           ease: "power4",
//           stagger: 0.04,
//           onComplete: () => splitInstance.revert()
//         });

//         // Paragraph animation
//         gsap.to(paraRef.current, {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           delay: 0.3,
//           ease: 'power3.out',
//           onStart: () => gsap.set(paraRef.current, { visibility: 'visible' })
//         });

//         // Button animation
//         gsap.to(buttonRef.current, {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           delay: 0.6,
//           ease: 'power3.out',
//           onStart: () => gsap.set(buttonRef.current, { visibility: 'visible' })
//         });
//       }, sectionRef);

//       return () => ctx.revert();
//     };

//     if (document.fonts && document.fonts.ready) {
//       document.fonts.ready.then(runAnimation);
//     } else {
//       runAnimation();
//     }
//   }, []);

//   // Section 2 ScrollTrigger animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Pin the text container
//       ScrollTrigger.create({
//         trigger: textContainerRef.current,
//         start: "top top",
//         end: "+=300%",
//         pin: true,
//         pinSpacing: false,
//         markers: false // Set to true for debugging
//       });

//       // Image animations
//       imagesRef.current.forEach((img, i) => {
//         gsap.fromTo(img,
//           { y: i % 2 === 0 ? 100 : -100, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: img,
//               start: "top bottom",
//               end: "top center",
//               scrub: true,
//               markers: false // Set to true for debugging
//             }
//           }
//         );
//       });

//       // Refresh ScrollTrigger after setup
//       ScrollTrigger.refresh();
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={sectionRef}>
//       <div className="">
//         {/* Section 1 - Unchanged */}
//         <div className="w-full h-screen bg-amber-50 flex flex-col items-center justify-center pb-40">
//           <h1
//             ref={headingRef}
//             className="font-helvetica font-bold text-7xl mb-6"
//             style={{ visibility: 'hidden' }}
//           >
//             About us
//           </h1>

//           <p
//             ref={paraRef}
//             className="font-helvetica text-xl text-center mb-6 px-4"
//             style={{
//               opacity: 0,
//               transform: 'translateY(30px)',
//               visibility: 'hidden',
//             }}
//           >
//             Alphane Labs is a startup based in San Diego, California developing materials <br /> characterization instrumentation and offering testing services
//           </p>

//           <button
//             ref={buttonRef}
//             className="group font-helvetica cursor-pointer bg-green-600 px-8 py-2 rounded-3xl text-white flex items-center transition"
//             style={{
//               opacity: 0,
//               transform: 'translateY(30px)',
//               visibility: 'hidden',
//             }}
//           >
//             <span className="transform transition-all duration-300 group-hover:-translate-x-2">
//               Contact us
//             </span>
//             <span className="ml-2 transform transition-all duration-300 group-hover:translate-x-2">
//               <GoArrowRight size={20} />
//             </span>
//           </button>
//         </div>

//         {/* Section 2 - Split Scroll Animation */}
//         <div className="w-full h-[300vh] bg-white relative">
//           {/* Text container to be pinned */}
//           <div 
//             ref={textContainerRef} 
//             className="w-full h-screen flex flex-col justify-center absolute top-0 left-0 z-10 pointer-events-none"
//           >
//             <h1 className='text-6xl w-full px-5 font-helvetica font-bold'>
//               The Alphane Labs team <br /> is dedicated to innovation <br /> and excellence.
//             </h1>
//             <small className='mt-4 leading-[1.3] text-sm w-full px-5 font-helvetica'>
//               <span className="block">We are a diverse group with complementary backgrounds in engineering, chemistry, and business.</span>
//               <span className="block">Together, we aim to help innovators accelerate their materials R&D by providing contract test</span>
//               <span className="block">services and instrumentation that bridge current gaps in materials characterization</span>
//             </small>
//           </div>

//           {/* Images container */}
//           <div className="w-full h-[300vh] relative z-0">
//             <img 
//               ref={el => imagesRef.current[0] = el}
//               className='w-[50vw] absolute top-[10vh] right-5 rounded-xl'
//               src="/10001.avif" 
//               alt="Team member" 
//             />
//             <img 
//               ref={el => imagesRef.current[1] = el}
//               className='w-[50vw] absolute top-[40vh] left-5 rounded-xl'
//               src="/10002.avif" 
//               alt="Lab equipment" 
//             />
//             <img 
//               ref={el => imagesRef.current[2] = el}
//               className='w-[50vw] absolute top-[70vh] right-5 rounded-xl'
//               src="/10003.avif" 
//               alt="Research" 
//             />
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;