import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const imageUrls = [
  "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-sunset-surrounded-by-grass_181624-22807.jpg",
  "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg",
  "https://img.freepik.com/free-photo/group-elephants-big-green-tree-wilderness_181624-16897.jpg",
  "https://img.freepik.com/premium-photo/blazing-sun-vast-savanna_1272857-120118.jpg",
  "https://img.free-photo/beautiful-shot-tree-savanna-plains-with-blue-sky_181624-21992.jpg",
];

const ScrollAnimation = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".scroll-image");

    panels.forEach((panel, i) => {
      let scale = i !== panels.length - 1 ? 0.9 + 0.025 * i : 1;

      gsap.to(panel, {
        scale,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top " + (70 + 40 * i),
          end: "bottom +=650px",
          endTrigger: ".end",
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-12 mx-auto max-w-2xl py-12">
      {imageUrls.map((image, index) => (
        <div key={index} className="scroll-image">
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
      <div className="end"></div>
    </div>
  );
};

export default ScrollAnimation;
