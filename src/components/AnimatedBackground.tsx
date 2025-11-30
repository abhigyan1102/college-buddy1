"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.002; // Slower animation for a more relaxed feel

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Dark aesthetic gradient colors (Deep Violet, Midnight Blue, Black)
      const hue1 = (time * 10) % 360;
      const hue2 = (time * 10 + 60) % 360;

      // Deep, dark background base
      gradient.addColorStop(0, "#0f0c29"); // Night
      gradient.addColorStop(0.5, "#302b63"); // Midnight
      gradient.addColorStop(1, "#24243e"); // Dark Blue

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add floating orbs with subtle glow
      for (let i = 0; i < 6; i++) {
        const x =
          canvas.width / 2 +
          Math.sin(time * 0.5 + i * 1.5) * (canvas.width / 2.5);
        const y =
          canvas.height / 2 +
          Math.cos(time * 0.3 + i * 1.2) * (canvas.height / 2.5);
        const radius = 100 + Math.sin(time + i) * 50;

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        // Subtle glowing orbs
        orbGradient.addColorStop(0, `hsla(${(hue1 + i * 40) % 360}, 60%, 50%, 0.15)`);
        orbGradient.addColorStop(1, `hsla(${(hue1 + i * 40) % 360}, 60%, 50%, 0)`);

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ filter: "blur(40px)" }}
    />
  );
}
