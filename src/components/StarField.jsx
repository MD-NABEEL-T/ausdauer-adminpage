import { useEffect, useRef } from "react";

// Twinkling star/dot background — mirrors the subtle scattered-dot look
// used across ausdauergroups.in
export default function StarField({ density = 90 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];

    const palette = [
      "rgba(255,255,255,0.9)",
      "rgba(255,255,255,0.5)",
      "rgba(255,214,140,0.8)", // warm accent dot, matches their yellow specks
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      seed();
    }

    function seed() {
      stars = Array.from({ length: density }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.4,
        color: palette[Math.floor(Math.random() * palette.length)],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005,
        glow: Math.random() > 0.85, // a handful get a soft glow, like the bright one on their hero
      }));
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const twinkle = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
        const alpha = 0.25 + twinkle * 0.75;

        ctx.beginPath();
        if (s.glow) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 8);
          grad.addColorStop(0, s.color.replace(/[\d.]+\)$/, `${alpha})`));
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.arc(s.x, s.y, s.r * 8, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = s.color.replace(/[\d.]+\)$/, `${alpha})`);
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}