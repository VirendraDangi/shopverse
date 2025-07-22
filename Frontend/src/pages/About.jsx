import React, { useRef, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { GoArrowRight } from "react-icons/go";
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import SplitScreenPinning from '../component/about/SplitScreenPinning';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import ParallaxSections from '../component/about/ParallaxSection';
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
   

  // particle fall aniamtion

 useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * window.innerWidth;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      const hue = Math.random() * 60 + 20; // Warm colors
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        background: hsla(${hue}, 80%, 60%, ${Math.random() * 0.3 + 0.1});
      `;
      
      document.querySelector('.particles-container').appendChild(particle);
      
      // Remove particle after animation completes
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    
    // Add particles periodically
    const particleInterval = setInterval(createParticle, 800);
    
    return () => clearInterval(particleInterval);
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
     <div className="w-full h-screen pt-40 bg-amber-50 flex flex-col items-center justify-center pb-40">
        <div className="particles-container absolute inset-0 overflow-hidden"></div>
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
    <a href="https://www.instagram.com/techburner/?hl=en">  Contact us</a>
    </span>
    <span className="ml-2 transform transition-all duration-300 group-hover:translate-x-2">
      <GoArrowRight size={20} />
    </span>
  </button>
 <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes border-pulse {
          0% { border-color: rgba(251, 191, 36, 0); }
          50% { border-color: rgba(251, 191, 36, 0.5); }
          100% { border-color: rgba(251, 191, 36, 0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 1; }
          80%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 5s ease-in-out infinite;
        }
        .animate-border-pulse {
          animation: border-pulse 3s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up.delay-100 {
          animation-delay: 0.1s;
        }
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in-up.delay-300 {
          animation-delay: 0.3s;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Particle animation */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: particle-fall linear infinite;
        }
        
        @keyframes particle-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0.1;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

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
     className='w-[50vw] absolute right-2 rounded-xl' src="/about_Img/team.jpg" alt="" />
            <img 
     ref={el => imagesRef.current[1] = el}
    className='w-[50vw] absolute left-5 top-[90vh] rounded-xl' src="/about_Img/10002.avif" alt="" />
            <img   
       ref={el => imagesRef.current[2] = el}
     className='w-[50vw] absolute right-5 top-[180vh] rounded-xl' src="/about_Img/work.jpg" alt="" />
          </div>
        </div>
     
      </div>

   <div className='bg-amber-50 h-[20vh]' >
      <div className='flex items-center bg-amber-50 justify-center  mb-5' >
       <h1 className='text-4xl bg-amber-50 font-bold' >
        OUR LEADERSHIP TEAM
      </h1>
      
     </div>

      <p className='absolute left-[26%] bg-amber-50 text-center font-helvetica ' >
Meet the team behind the innovations and solutions that <br /> are transforming the industry
       </p>
   </div>

  <div className=' bg-amber-50 pt-20' >
        <SplitScreenPinning />
  </div>
 

  <Footer/>
    </div>
  );
};

export default About;



