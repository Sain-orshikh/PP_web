import { useState, useEffect, useRef } from "react";

export default function SpotlightEffect({ radius = 250 }) {
  const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
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
      // Smooth lagging effect using Linear Interpolation (Lerp)
      spotlightPos.current.x += (mouse.x - spotlightPos.current.x) * 0.1;
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
      className="fixed inset-0 bg-black pointer-events-none z-20"
      style={{
        WebkitMaskImage: `radial-gradient(circle ${radius}px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 99%, black 100%)`,
        maskImage: `radial-gradient(circle ${radius}px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 99%, black 100%)`,
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)'
      }}
    />
  );
}
