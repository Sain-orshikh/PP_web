import { useState, useEffect, useRef } from "react";

export default function LaggingSpotlight() {
  const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const spotlightRadius = 200; // Adjust size of the white circle
  const spotlightPos = useRef({ x: mouse.x, y: mouse.y });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    let animationFrame;

    const moveSpotlight = () => {
      // Linear Interpolation (Lerp) for smooth movement
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
    <div className="relative">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none"
        style={{
          WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 99%, black 100%)`,
          maskImage: `radial-gradient(circle ${spotlightRadius}px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 99%, black 100%)`,
        }}
      ></div>

      {/* Content */}
      <div className="p-10 space-y-4">
        <h1 className="text-3xl font-bold text-white">
          Move your mouse! The spotlight is now fully white.
        </h1>
        <p className="text-white">No gradient effect—just a solid white circle.</p>

        {/* Image Div */}
        <div className="w-64 h-40 bg-gray-300 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Sample"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Some more content */}
        <div className="bg-yellow-400 p-4 rounded-lg text-black text-xl font-bold">
          Keep moving the mouse to see the solid cutout effect!
        </div>
      </div>
    </div>
  );
}
