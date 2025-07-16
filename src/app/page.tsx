"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const nameRef = useRef(null);
  const aboutRef = useRef(null);
  const nextSectionRef = useRef(null);
  const nameTileRef = useRef(null);
  const [showNextSection, setShowNextSection] = useState(false);

  useEffect(() => {
    // Animate tile first
    gsap.fromTo(
      nameTileRef.current,
      { opacity: 0 }, 
      { opacity: 0.75, duration: 1.5, delay: 0.5 }
    );
    
    // Then animate name
    gsap.fromTo(
      nameRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 1.5 }  // Starts after tile animation
    );
    
    // Finally animate about button
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 2.5 }  // Starts after name animation
    );
  }, []);

  const handleAboutClick = () => {
    setShowNextSection(true); // Show the section when clicked
    
    // Small timeout to ensure the section is rendered before scrolling
    setTimeout(() => {
      gsap.to(window, {
        duration: 2,
        scrollTo: { y: nextSectionRef.current, offsetY: 0 },
        ease: "power2.inOut"
      });
    }, 100);
  };

  return (
    <div className="bg-[#87A5B0] font-[var(--font-outfit)]">
      <section className="h-screen flex items-center justify-center">
        {/* Name tile */}
        <div style={{ opacity: 0 }} ref={nameTileRef} className="bg-[#63578B] rounded-xl shadow-xl w-[40%] h-[60%] flex flex-col items-center justify-center gap-8 p-8">
          {/* Name inside the tile */}
          <div style={{ opacity: 0 }} ref={nameRef} className="text-7xl font-extralight text-white">
            Xavier Arnold
          </div>
          
          {/* About button inside the tile */}
          <div className="group relative px-5 cursor-pointer active:shadow-inner active:translate-y-1 transition-all duration-150">
            <div
              style={{ opacity: 0 }}
              ref={aboutRef}
              className="content-center text-2xl font-extralight z-10 relative"
              onClick={handleAboutClick}
            >
              About
            </div>
            <div className="absolute inset-0 bg-[#3E3F43] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl shadow-md z-0"></div>
          </div>
        </div>
      </section>
      
      {/* Only render the next section if showNextSection is true */}
      {showNextSection && (
        <section ref={nextSectionRef} className="w-full h-screen flex items-center justify-center bg-[#87A5B0]">
          <div className='bg-[#63578B] rounded-xl shadow-xl w-[90%] h-[90%] flex items-center justify-center text-white text-2xl'>
            next
          </div>
        </section>
      )}
    </div>
  );
}
