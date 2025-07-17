"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HomePage() {
  const homeContentRef = useRef(null);

  // Animate the new content to fade in after the page loads
  useEffect(() => {
    gsap.fromTo(
      homeContentRef.current,
      { opacity: 0, y: 20 }, // Start invisible and slightly down
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3 } // Fade in and move up
    );
  }, []);

  return (
    <div className="bg-[#000000] text-white">
      <section className="h-screen flex items-center justify-center">
        {/* 
          This container perfectly matches the final state of the animation from the previous page,
          creating a seamless transition.
        */}
        {/* This new relative container will hold both divs and manage their stacking */}
        <div className="relative w-[40%] h-[90%]">
          {/* The "Xaaver" div, positioned absolutely on top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-[#000000] px-4">
              Xaaver
          </div>
          {/* The bordered div, which acts as the base layer */}
          <div
            className="bg-transparent rounded-xl shadow-md w-full h-full flex flex-col p-8 relative border-2 border-[#1976D2]"
          >
            {/* New content that will fade in on this page */}
            <div ref={homeContentRef} className="w-full h-full opacity-0">
              {/* Your actual home page layout goes here */}
              <div className="">
                <h1 className="text-4xl font-[var(--font-azeret-mono)] font-[300]">Welcome Home</h1>
                <p className="mt-4">The content for the home page.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen flex items-center justify-center">
        <div>Test text</div>
      </section>
    </div>
  );
}