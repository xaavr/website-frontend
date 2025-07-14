"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const nameRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      nameRef.current,
      { opacity: 0},
      { opacity: 1, duration: 2.5, delay: 0.5}
    );
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0},
      { opacity: 1, duration: 2.5, delay: 1}
    );
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-[#87A5B0] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-outfit)]">
      <main className="row-start-2 flex flex-col gap-[32px] items-center justify-center h-full">
        <div style={{ opacity: 0 }} ref={nameRef} className="text-5xl font-extralight">Xavier Arnold</div>
        <div className="group relative px-7 cursor-pointer active:shadow-inner active:translate-y-1 transition-all duration-150">
          <div 
            style={{ opacity: 0 }}
            ref={aboutRef}
            className="content-center text-2xl font-extralight z-10 relative"
            >
              About
            </div>
            <div className="absolute inset-0 bg-[#3E3F43] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl shadow-md z-0">
            </div>
        </div>
      </main>
    </div>
  );
}
