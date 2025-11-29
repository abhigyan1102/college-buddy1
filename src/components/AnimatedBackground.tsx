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
      time += 0.005;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Dynamic gradient colors
      const hue1 = (time * 20) % 360;
      const hue2 = (time * 20 + 60) % 360;
      const hue3 = (time * 20 + 120) % 360;
      const hue4 = (time * 20 + 180) % 360;

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.3)`);
      gradient.addColorStop(0.33, `hsla(${hue2}, 70%, 60%, 0.3)`);
      gradient.addColorStop(0.66, `hsla(${hue3}, 70%, 60%, 0.3)`);
      gradient.addColorStop(1, `hsla(${hue4}, 70%, 60%, 0.3)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add floating orbs
      for (let i = 0; i < 5; i++) {
        const x =
          canvas.width / 2 +
          Math.sin(time + i * 1.5) * (canvas.width / 3);
        const y =
          canvas.height / 2 +
          Math.cos(time * 0.8 + i * 1.2) * (canvas.height / 3);
        const radius = 150 + Math.sin(time * 2 + i) * 50;

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        orbGradient.addColorStop(0, `hsla(${(hue1 + i * 60) % 360}, 80%, 70%, 0.4)`);
        orbGradient.addColorStop(1, `hsla(${(hue1 + i * 60) % 360}, 80%, 70%, 0)`);

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
      className="fixed inset-0 -z-10 opacity-60"
      style={{ filter: "blur(60px)" }}
    />
  );
}
