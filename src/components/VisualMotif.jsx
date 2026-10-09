import React, { useEffect, useRef } from 'react';

export default function VisualMotif() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      angle += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.7;

      // Draw subtle orbital rings
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(244, 241, 235, 0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(200, 255, 0, 0.15)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.75, angle, angle + Math.PI * 1.5);
      ctx.stroke();

      // AE Monogram vector lines in center
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(0.8, 0.8);

      // Letter A stroke
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#F4F1EB';
      ctx.beginPath();
      ctx.moveTo(-40, 40);
      ctx.lineTo(0, -40);
      ctx.lineTo(40, 40);
      ctx.stroke();

      // Crossbar A
      ctx.strokeStyle = '#C8FF00';
      ctx.beginPath();
      ctx.moveTo(-20, 10);
      ctx.lineTo(20, 10);
      ctx.stroke();

      // Letter E overlapping
      ctx.strokeStyle = 'rgba(244, 241, 235, 0.6)';
      ctx.beginPath();
      ctx.moveTo(10, -35);
      ctx.lineTo(45, -35);
      ctx.moveTo(10, 0);
      ctx.lineTo(35, 0);
      ctx.moveTo(10, 35);
      ctx.lineTo(45, 35);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="w-full h-64 sm:h-80 relative flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
}
