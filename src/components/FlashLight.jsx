import { useState, useEffect, useRef } from "react";

export default function LaggingSpotlight() {
  const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const spotlightRadius = 300; // Adjust size of the spotlight
  const spotlightPos = useRef({ x: mouse.x, y: mouse.y });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let animationFrame;

    const moveSpotlight = () => {
      // Linear Interpolation (Lerp) for smooth movement
      spotlightPos.current.x += (mouse.x - spotlightPos.current.x) * 0.1; // Adjust the 0.1 for more/less lag
      spotlightPos.current.y += (mouse.y - spotlightPos.current.y) * 0.1;

      document.documentElement.style.setProperty("--spotlight-x", `${spotlightPos.current.x}px`);
      document.documentElement.style.setProperty("--spotlight-y", `${spotlightPos.current.y}px`);

      animationFrame = requestAnimationFrame(moveSpotlight);
    };

    animationFrame = requestAnimationFrame(moveSpotlight);
    return () => cancelAnimationFrame(animationFrame);
  }, [mouse]);

  return (
      <div
        className="fixed inset-0 bg-black pointer-events-none z-40"
        style={{
          WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 0%, black 100%)`,
          maskImage: `radial-gradient(circle ${spotlightRadius}px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 0%, black 100%)`,
        }}
      ></div>
  );
}
