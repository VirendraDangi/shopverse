import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const DemoScrollGallery = () => {
 useEffect(() => {
  const images = gsap.utils.toArray("img");

  const updateProgress = (instance) => {
    const loader = document.querySelector(".loader--text");
    if (loader) {
      loader.textContent = `${Math.round(
        (instance.progressedCount * 100) / images.length
      )}%`;
    }
  };

  const showDemo = () => {
    document.body.style.overflow = "auto";
    document.scrollingElement.scrollTo(0, 0);

    gsap.utils.toArray("section").forEach((section, index) => {
      const w = section.querySelector(".wrapper");
      if (!w) return;

      const startX = index % 2 === 0 ? -w.scrollWidth : section.offsetWidth;
      const endX = index % 2 === 0 ? 0 : -(w.scrollWidth - section.offsetWidth);

      gsap.fromTo(
        w,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  };

  const alreadyLoaded = localStorage.getItem("homeLoaded");

  if (!alreadyLoaded) {
    document.body.style.overflow = "hidden";
    const loader = document.querySelector(".loader");

    imagesLoaded(images)
      .on("progress", updateProgress)
      .on("always", () => {
        setTimeout(() => {
          gsap.to(loader, { autoAlpha: 0, duration: 0.5 });
          localStorage.setItem("homeLoaded", "true");
          showDemo();
        }, 1000); // optional delay for smoothness
      });
  } else {
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "none"; // hide instantly
    showDemo(); // directly run scroll animation
  }
}, []);

  return (
    <div className="relative bg-amber-50 ">
      {/* Loader */}
      <div className="loader fixed inset-0 bg-black text-white flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Loading</h1>
          <h2 className="loader--text text-2xl mt-2">0%</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="demo-wrapper overflow-x-hidden">
        {/* <header className="h-screen flex items-center justify-center">
          <div>
            <h1 className="text-6xl font-bold">ScrollTrigger</h1>
            <h2 className="text-2xl">demo</h2>
          </div>
        </header> */}

        <section className="demo-text">
          <div className="wrapper text text-[clamp(8rem,15vw,16rem)] leading-none font-black">
   PREMIUMQUALITYNEVERGOESOUTOFSTYLE
          </div>
        </section>

       {Array.from({ length: 12 }).reduce((acc, _, i) => {
  if (i % 4 === 0) acc.push([]);
  acc[acc.length - 1].push(i);
  return acc;
}, []).map((group, i) => (
  <section key={i} className="demo-gallery pb-4">
    <ul className="wrapper flex">
      {group.map((index) => (
        <li key={index} className="flex-shrink-0 w-[clamp(500px,60vw,800px)] pr-4">
          <img
             src={`/galleryimg/gallery-${(index % 6) + 1}.avif`}
            width="1240"
            height="874"
            className="bg-gray-100 w-full h-auto"
            alt={`Gallery ${index + 1}`}
          />
        </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="demo-text">
          <div className="wrapper text text-[clamp(8rem,15vw,16rem)] leading-none font-black">
     PREMIUMQUALITYNEVERGOESOUTOFSTYLE
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default DemoScrollGallery;