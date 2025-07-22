import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SplitScreenPinning = () => {
  useEffect(() => {
    const details = gsap.utils.toArray(".split-section:not(:first-child)");
    const photos = gsap.utils.toArray(".split-image:not(:first-child)");
    const allPhotos = gsap.utils.toArray(".split-image");

    gsap.set(photos, { yPercent: 101 });

    ScrollTrigger.create({
      trigger: ".split-section-container",
      start: "top top",
      end: "bottom bottom",
      pin: ".split-right",
      markers: false,
    });

    details.forEach((detail, index) => {
      const animation = gsap
        .timeline()
        .to(photos[index], { yPercent: 0 })
        .set(allPhotos[index], { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: detail,
        start: "top 90%",
        end: "top top",
        animation: animation,
        scrub: true,
        markers: false,
        
      });
    });
  }, []);

  return (
    <section className="split-section-container bg-amber-50 ">
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Left Side */}
          <div className="w-1/2">
            <div className="mx-auto w-4/5">
              <div className="split-section min-h-screen flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Shlok Srivastava</h2>
                <p className="text-gray-700">
                 CEO
                </p>
              </div>
              <div className="split-section min-h-screen flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Dharmender Singh</h2>
                <p className="text-gray-700">
                 Finance Account Manager
                </p>
              </div>
                            <div className="split-section min-h-screen flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Himanshu Singh</h2>
                <p className="text-gray-700">
          Production Manager
                </p>
              </div>

  <div className="split-section min-h-screen flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Muskan Singhaniya</h2>
                <p className="text-gray-700">
          Creative Head
                </p>
              </div>


               <div className="split-section min-h-screen flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Utkarsh Malhotra</h2>
                <p className="text-gray-700">
       Social Media Strategist
                </p>
              </div>

               <div className="split-section min-h-screen flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Venkatesh Parik</h2>
                <p className="text-gray-700">
       
Illustrator & Graphic Artist
                </p>
              </div>

            </div>
          </div>

   

          {/* Right Side */}
          <div className="w-1/2 h-screen flex flex-col justify-center split-right">
            <div className="relative w-[40vw] h-[40vw] rounded-2xl overflow-hidden mx-auto">
              <img
                className="absolute w-full h-full object-cover split-image"
                src="/about_Img/slok.png"
                alt="placeholder"
              />
              <img
                className="absolute w-full h-full object-cover split-image"
                src="/about_Img/dhrmender.avif"
                alt="placeholder"
              />
              <img
                className="absolute w-full h-full object-cover split-image"
                src="/about_Img/himanshu.avif"
                alt="placeholder"
              />
                <img
                className="absolute w-full h-full object-cover split-image"
                src="/about_Img/muskan singhaniya.jpg"
                alt="placeholder"
              />
                <img
                className="absolute w-full h-full object-cover split-image"
                src="/about_Img/uthkarsh.avif"
                alt="placeholder"
              />
                <img
                className="absolute w-full h-full object-cover split-image"
                src="/about_Img/venktesh.avif"
                alt="placeholder"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitScreenPinning;
