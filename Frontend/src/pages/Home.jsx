import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink, useNavigate } from "react-router-dom";
  import Lenis from '@studio-freight/lenis';


gsap.registerPlugin(ScrollTrigger);


const Home = () => {
const navigate = useNavigate()
const seemorehandler =()=>{
  navigate("products")
}

const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


  const containerRef = useRef();
const img1Ref = useRef();
const img2Ref = useRef();
const img3Ref = useRef();
const leftTextRef = useRef();
const rightTextRef = useRef();
const footerRef = useRef();


useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top ",
        end: "+=300%",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });

    // Image 1 scales in
    tl.fromTo(
      img1Ref.current,
      { scale: 1, opacity: 1 },
      { scale: 5, opacity: 1, duration: 8 ,delay:1 }
    );


    // 2. Texts come in from left/right


    // Image 2 comes from below and scales in
    tl.fromTo(
      img2Ref.current,
      { y: "100%", scale: 1, opacity: 0 },
      { y: "0%", scale: 4, opacity: 1, duration: 10 },
      "+=0.2"
    );

    tl.fromTo(
  [leftTextRef.current, rightTextRef.current],
  {
    x: (i) => (i === 0 ? "-100%" : "100%"),
    opacity: 0,delay:5,duration:8,
  },
  {
    x: "0%",
    opacity: 1,
    duration: 20,
    ease: "power2.out",
  },
  "<" // sync with image scaling
);

    // Image 3 comes from below and scales in
    tl.fromTo(
      img3Ref.current,
      { y: "100%", scale: 1, opacity: 0 },
      { y: "0%", scale: 3, opacity: 1, duration: 15 },
      "+=0.2"
    );

    tl.to(
  footerRef.current,
  {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power2.out",
  },
  "+=1" // delay after last image
);

  }, containerRef);

  return () => ctx.revert();
}, []); 


  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const [hovered, setHovered] = useState("default");

  const getImage = () => {
    switch (hovered) {
      case "women":
        return "/page-2.jpg";
      case "men":
        return "/men-shoe.jpg";
      case "kids":
        return "/kid-shoe.jpg";
      default:
        return "/page-2.jpg"; // default image
    }
  }



  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video - Fixed Scaling */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/FA25_07172025_PLP_Premium_eSpot-01_Desktop_458x673_Video.webm"
            type="video/webm"
          />
          <source
            src="/FA25_07172025_PLP_Premium_eSpot-01_Desktop_458x673_Video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Modern Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/60 via-black/40 to-black/70 z-10" />
        
        {/* Subtle Vignette Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-black/30 z-20" />

        {/* Brand Logo */}
        <div className={`absolute top-6 left-6 text-white font-bold text-xl tracking-wider transition-all duration-1000 delay-200 z-40 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          SHOPVERSE
        </div>
        

        {/* Main Content */}
        <div className="relative z-30 flex flex-col justify-end items-start h-full text-white px-4 pb-12">
          {/* Hero Title */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              The Premium Old School
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl max-w-2xl text-gray-200 leading-relaxed transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            An Icon Evolved. By Cocona Hiraki
          </p>
        </div>
      </div>

      {/*  Section 2  */}
<div className="h-[80vh] w-full bg-amber-50 relative overflow-hidden max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:py-6 max-sm:px-4">
  {/* Dynamic Image */}
  <img
    className="absolute right-4 top-9 w-1/2 h-auto object-cover rounded-md transition-all duration-500 
               max-sm:static max-sm:w-full max-sm:max-w-[300px] max-sm:mt-4"
    src={getImage()}
    alt="Page"
  />

  {/* Text Section */}
  <div className="absolute left-5 mt-24 space-y-4 
                  max-sm:static max-sm:mt-6 max-sm:text-center max-sm:px-2">
    <small className="text-amber-400 font-helvetica text-sm">
      Shop Everyday Essential
    </small>

    <div className="mt-5 space-y-5">
      <h1
        className="font-helvetica text-4xl font-bold text-gray-800 transform transition-transform duration-300 hover:-rotate-2 hover:scale-105 
                   max-sm:text-2xl"
        onMouseEnter={() => setHovered("women")}
        onMouseLeave={() => setHovered("default")}
      >
        Women's Shoes
      </h1>

      <h1
        className="font-helvetica text-4xl font-bold text-gray-800 transform transition-transform duration-300 hover:-rotate-2 hover:scale-105 
                   max-sm:text-2xl"
        onMouseEnter={() => setHovered("men")}
        onMouseLeave={() => setHovered("default")}
      >
        Men's Shoes
      </h1>

      <h1
        className="font-helvetica text-4xl font-bold text-gray-800 transform transition-transform duration-300 hover:-rotate-2 hover:scale-105 
                   max-sm:text-2xl"
        onMouseEnter={() => setHovered("kids")}
        onMouseLeave={() => setHovered("default")}
      >
        Kids' Shoes
      </h1>
    </div>
  </div>
</div>


  {/* section-3  */}

 <div className="h-[75vh] w-full flex items-center justify-center gap-x-5 px-4 overflow-hidden 
                max-sm:flex-col max-sm:h-auto max-sm:gap-y-8 max-sm:py-6">
  {/* Box 1 */}
  <div className="relative bg-[url('/76-1.svg')] bg-no-repeat bg-contain bg-left-top h-[30vh] w-[30vw] transition duration-300 hover:text-emerald-800 
                  max-sm:w-full max-sm:h-[40vh]">
    <img
      src="/10003.png"
      alt=""
      className="absolute top-4 left-7 w-[20vw] h-auto max-sm:w-[60vw] max-sm:left-1/2 max-sm:-translate-x-1/2"
    />
    <div className="top-65 left-20 font-lonalista text-4xl absolute 
                    max-sm:top-auto max-sm:bottom-4 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:text-2xl text-center">
      <p>Beige</p>
      <button
       onClick={()=>seemorehandler()}
      className=" cursor-pointer group px-6 py-2 mt-4 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition duration-300 ease-in-out flex gap-0.5 justify-center">
        {"See More".split("").map((char, index) => (
          <span
            key={index}
            className="transition-transform duration-300 group-hover:scale-125"
          >
            {char}
          </span>
        ))}
      </button>
    </div>
  </div>

  {/* Box 2 */}
  <div className="relative bg-[url('/10001.svg')] bg-no-repeat bg-contain bg-left-top h-[30vh] w-[30vw] 
                  max-sm:w-full max-sm:h-[40vh]">
    <img
      src="/10004.png"
      alt=""
      className="absolute top-4 left-7 w-[20vw] h-auto max-sm:w-[60vw] max-sm:left-1/2 max-sm:-translate-x-1/2"
    />
    <div className="top-65 left-20 font-lonalista text-4xl absolute 
                    max-sm:top-auto max-sm:bottom-4 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:text-2xl text-center">
      <p>Violet</p>
      <button
        onClick={()=>seemorehandler()}
      className="cursor-ponter group px-6 py-2 mt-4 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition duration-300 ease-in-out flex gap-0.5 justify-center">
        {"See More".split("").map((char, index) => (
          <span
            key={index}
            className="transition-transform duration-300 group-hover:scale-125"
          >
            {char}
          </span>
        ))}
      </button>
    </div>
  </div>

  {/* Box 3 */}
  <div className="relative bg-[url('/10002.svg')] bg-no-repeat bg-contain bg-left-top h-[30vh] w-[30vw] 
                  max-sm:w-full max-sm:h-[40vh]">
    <img
      src="/10005.png"
      alt=""
      className="absolute top-4 left-7 w-[20vw] h-auto max-sm:w-[60vw] max-sm:left-1/2 max-sm:-translate-x-1/2"
    />
    <div className="top-65 left-20 font-lonalista text-4xl absolute 
                    max-sm:top-auto max-sm:bottom-4 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:text-2xl text-center">
      <p>Kaki</p>
      <button 
        onClick={()=>seemorehandler()}
      className=" cursor-pointer group px-6 py-2 mt-4 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition duration-300 ease-in-out flex gap-0.5 justify-center">
        {"See More".split("").map((char, index) => (
          <span
            key={index}
            className="transition-transform duration-300 group-hover:scale-125"
          >
            {char}
          </span>
        ))}
      </button>
    </div>
  </div>
</div>


{/* section-4 */}


<div className="">
  <div>
    <div ref={containerRef} className="h-[150vh] bg-white relative overflow-hidden 
                                        max-sm:h-auto max-sm:py-20">
      <div className="sticky top-0 h-screen flex items-center justify-center 
                      max-sm:relative max-sm:flex-col max-sm:gap-8 max-sm:h-auto">
        
        {/* Left Text */}
        <div
          ref={leftTextRef}
          className="absolute top-15 left-10 text-5xl text-amber-50 font-helvetica font-bold z-50
                     max-sm:static max-sm:text-center max-sm:text-2xl"
        >
          Comfort That Keeps Up
        </div>

        {/* Right Text */}
        <div
          ref={rightTextRef}
          className="absolute right-10 bottom-10 text-5xl font-helvetica font-bold text-amber-50 z-50
                     max-sm:static max-sm:text-center max-sm:text-2xl"
        >
          Built for Play. Made for Comfort
        </div>

        {/* Image 1 */}
        <img
          ref={img1Ref}
          src="/1img.jpg"
          alt="Image 1"
          className="absolute w-[300px] h-auto object-cover rounded-xl z-10
                     max-sm:static max-sm:w-[80%]"
        />

        {/* Image 2 */}
        <img
          ref={img2Ref}
          src="/img2.jpg"
          alt="Image 2"
          className="absolute w-[300px] h-auto object-cover rounded-xl z-20
                     max-sm:static max-sm:w-[80%]"
        />

        {/* Image 3 */}
        <img
          ref={img3Ref}
          src="/3img.jpg"
          alt="Image 3"
          className="absolute w-[300px] h-auto object-cover rounded-xl z-30
                     max-sm:static max-sm:w-[80%]"
        />
      </div>
    </div>
  </div>
</div>



{/* footer */}


<div ref={footerRef} className="opacity-0 translate-y-20">
  <footer className="bg-gray-900 text-white py-10 px-6 max-sm:px-4 max-sm:py-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 max-sm:gap-6">
      
      {/* Brand */}
      <div className="max-sm:text-center">
        <h2 className="text-2xl font-bold font-lonalista text-amber-400">ShoeVerse</h2>
        <p className="text-sm mt-2 text-gray-400">Step into comfort and style with our curated collection of shoes for every walk of life.</p>
      </div>

      {/* Shop Links */}
      <div className="max-sm:text-center">
        <h3 className="text-lg font-semibold mb-3">Shop</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white">Men's Shoes</a></li>
          <li><a href="#" className="hover:text-white">Women's Shoes</a></li>
          <li><a href="#" className="hover:text-white">Kids' Shoes</a></li>
          <li><a href="#" className="hover:text-white">New Arrivals</a></li>
        </ul>
      </div>

      {/* Company Links */}
      <div className="max-sm:text-center">
        <h3 className="text-lg font-semibold mb-3">Company</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white">About Us</a></li>
          <li><a href="#" className="hover:text-white">Careers</a></li>
          <li><a href="#" className="hover:text-white">Press</a></li>
          <li><a href="#" className="hover:text-white">Contact</a></li>
        </ul>
      </div>

      {/* Social + Newsletter */}
      <div className="max-sm:text-center">
        <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
        <div className="flex justify-center md:justify-start space-x-4 mb-4">
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
        </div>
        <form className="flex items-center max-sm:flex-col max-sm:gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-800 text-sm px-3 py-2 w-full outline-none placeholder-gray-500 rounded-l max-sm:rounded max-sm:w-full"
          />
          <button className="bg-amber-400 text-black px-4 py-2 rounded-r text-sm hover:bg-amber-500 transition max-sm:rounded max-sm:w-full">
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* Bottom */}
    <div className="mt-10 text-center text-sm text-gray-500 max-sm:mt-6">
      &copy; {new Date().getFullYear()} ShoeVerse. All rights reserved.
    </div>
  </footer>
</div>




    </>
  )
}

export default Home