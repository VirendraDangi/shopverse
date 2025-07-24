import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GoArrowRight, GoChevronDown, GoChevronUp } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

const MobileFooter = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const [isLinksExpanded, setIsLinksExpanded] = useState(false);

  const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (bg) {
      bg.style.backgroundColor = 'rgb(32 30 28)';

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
    }
  }, []);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Career", href: "/career" },
    { name: "About us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Solutions", href: "/solutions" },
    { name: "Linkedin", href: "https://in.linkedin.com/in/shlok-srivastava-730354125" }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col text-amber-50 overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
      ></div>

      {/* Top Section - Header & CTA */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-8">
        {/* Main Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-amber-50 drop-shadow-lg font-helvetica leading-tight mb-4">
            Ready to Elevate
            <br />
            Your Style?
          </h2>
          <p className="text-sm leading-relaxed opacity-90 max-w-xs mx-auto">
            Subscribe for exclusive deals and fresh drops from Shoeverse
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-8">
          <button className="group font-helvetica cursor-pointer bg-green-600 px-6 py-3 rounded-full text-amber-50 flex items-center mx-auto transition-all duration-300 hover:bg-green-700 hover:scale-105 shadow-lg">
            <span className="transform text-base transition-all duration-300 group-hover:-translate-x-1">
              <a href="https://www.instagram.com/techburner/?hl=en">Contact us</a>
            </span>
            <span className="ml-2 transform transition-all duration-300 group-hover:translate-x-1">
              <GoArrowRight size={18} />
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-amber-50/20 mb-6"></div>

        {/* Navigation Links - Collapsible */}
        <div className="text-center">
          <button
            onClick={() => setIsLinksExpanded(!isLinksExpanded)}
            className="flex items-center justify-center mx-auto mb-4 text-amber-50 hover:text-green-400 transition-colors"
          >
            <span className="text-sm font-medium mr-2">Quick Links</span>
            {isLinksExpanded ? <GoChevronUp size={16} /> : <GoChevronDown size={16} />}
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isLinksExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="grid grid-cols-2 gap-3 px-4">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm py-2 px-3 rounded-lg bg-amber-50/10 hover:bg-green-600/20 hover:text-green-400 transition-all duration-300 backdrop-blur-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Brand & Copyright */}
      <div className="pb-6">
        {/* Brand Name */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-amber-50 tracking-wider drop-shadow-xl font-helvetica">
            SHOEVERSE
          </h1>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-amber-50/80 leading-relaxed">
            © 2025 Alphane Lab. All rights reserved.
          </p>
        </div>

        {/* Bottom Accent Line */}
        <div className="w-16 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-8 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-12 w-3 h-3 bg-amber-50/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-6 w-2 h-2 bg-green-400/40 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-60 right-8 w-1 h-1 bg-amber-50/30 rounded-full animate-pulse delay-700"></div>
    </section>
  );
};

export default MobileFooter;