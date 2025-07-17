"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation'; // 1. Import useRouter

export default function Home() {
  const router = useRouter(); // 2. Initialize the router
  const nameRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutGroupRef = useRef(null);
  const homeContentRef = useRef(null);
  const backgroundTileRef = useRef(null); // Changed from nameTileRef to backgroundTileRef
  const [showAboutEffects, setShowAboutEffects] = useState(false);
  // Add these state variables to track when elements should be removed
  const [showName, setShowName] = useState(true);
  const [showButton, setShowButton] = useState(true);
  // REMOVE this state, it will be handled by the new page
  // const [showHomeContent, setShowHomeContent] = useState(false);

  useEffect(() => {
    // Then animate name
    gsap.fromTo(
      nameRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 0.5 }
    );

    // Animate about button
    gsap.fromTo(
      aboutGroupRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: .5,
        delay: 1.5,
        onComplete: () => setShowAboutEffects(true)
      }
    );
  }, []);

  const handleAboutClick = () => {
    if (aboutRef.current) {
      aboutRef.current.classList.remove('transition-colors');
    }

    const tl = gsap.timeline();

    // Step 1: Animate background to white AND text to blue CONCURRENTLY
    tl.to(backgroundTileRef.current, {
      backgroundColor: "white",
      duration: 1.5
    })
    .to([nameRef.current, aboutRef.current], {
      color: "#1976D2", // Change text to blue
      duration: 2.25
    }, "<-0.25"); // The "<" makes this animation start at the same time as the previous one
    


    // Step 2: Animate the text back to white
    tl.to([nameRef.current, aboutRef.current], {
      color: "#FFFFFF", // Change text back to white
      duration: 1,
      onComplete: () => {
        // After the fade to white is done, remove them from the DOM
        setShowName(false);
        setShowButton(false);
      }
    }, ">0.5");

    tl.to(homeContentRef.current, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        // setShowHomeContent(true);
      }
    }, ">");

    // Step 3: Wait until text is removed, THEN fade out background and navigate
    tl.to(backgroundTileRef.current, {
      backgroundColor: "transparent",
      boxShadow: "none",
      border: "2px solid #1976D2",
      duration: 1,
      onComplete: () => {
        // 3. Navigate to the new page instead of showing content
        router.push('/home'); 
      }
    }, "+=0.5"); // Start 0.5s after the previous animation completes
  };

  // Ensure the font is applied to each text element
  return (
    <div className="bg-[#000000] text-white">
      <section className="h-screen flex items-center justify-center">
        {/* Single background tile with content directly on it */}
        <div
          ref={backgroundTileRef}
          className="bg-[#000000] rounded-xl shadow-md w-[40%] h-[90%] flex flex-col items-center justify-center gap-8 p-8 relative"
        >
          {/* This div can be removed as it's no longer needed */}
          {/* <div className="absolute inset-0 flex items-center justify-center"> ... </div> */}
          
          {/* Only render name if showName is true */}
          {showName && (
            <div
              style={{ opacity: 0 }}
              ref={nameRef}
              className="text-7xl font-[var(--font-azeret-mono)] font-[300]"
            >
              Xavier Arnold
            </div>
          )}

          {/* Only render button if showButton is true */}
          {showButton && (
            <div
              onClick={handleAboutClick}
              ref={aboutGroupRef}
              style={{ opacity: 0 }}
              className="group relative px-5 cursor-pointer active:translate-y-1 transition-all duration-150"
            >
              <div
                ref={aboutRef}
                className="content-center text-2xl font-[var(--font-azeret-mono)] font-[300] z-10 relative group-hover:text-[#000000] transition-colors duration-500"
              >
                Explore
              </div>
              {showAboutEffects && <div className="absolute inset-0 bg-[#FFFFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md shadow-md z-0"></div>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
