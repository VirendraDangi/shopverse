import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxSections = () => {
  const sectionsRef = useRef([]);

  const getRatio = (el) =>
    window.innerHeight / (window.innerHeight + el.offsetHeight);

  useEffect(() => {
    sectionsRef.current.forEach((section, i) => {
      const bg = section.querySelector(".bg");

      // Set a random image
      bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

      gsap.fromTo(
        bg,
        {
          backgroundPosition: () =>
            i
              ? `50% ${-window.innerHeight * getRatio(section)}px`
              : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, []);

  return (
    <div>
      {[0, 1].map((_, i) => (
        <section
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="relative h-screen flex items-center justify-center"
        >
          <div className="bg absolute top-0 left-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"></div>
          <h1 className="text-white text-4xl md:text-6xl font-light drop-shadow-md z-10">
            {i === 0 ? "Simple Parallax Section" : "Hey Look, a Title"}
          </h1>
        </section>
      ))}
    </div>
  );
};

export default ParallaxSections;
