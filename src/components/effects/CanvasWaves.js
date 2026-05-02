'use client';
import { useEffect, useRef } from 'react';

export function CanvasWaves({ canvasHeight = 200, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, waves = [];
    let animationFrameId;

    // Dalga Ayarları (Kullanıcının sağladığı konfigürasyon)
    const config = {
      count: 5,
      waveHeight: 40,
      speed: 0.01,
      colors: ['rgba(74, 144, 226, 0.25)', 'rgba(80, 227, 194, 0.2)', 'rgba(189, 16, 224, 0.15)']
    };

    function init() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvasHeight;
      waves = [];
      for (let i = 0; i < config.count; i++) {
        waves.push({
          y: height / 2,
          length: 0.005 + (Math.random() * 0.01),
          amplitude: 20 + (Math.random() * config.waveHeight),
          speed: config.speed + (Math.random() * 0.02),
          offset: Math.random() * 100,
          color: config.colors[i % config.colors.length]
        });
      }
    }

    function draw() {
      // Arka planı temizle (Şeffaflık için clearRect kullanıyoruz)
      ctx.clearRect(0, 0, width, height);

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = wave.color;

        // Üst Dalga
        for (let x = 0; x <= width; x += 5) {
          const relativeY = Math.sin(x * wave.length + wave.offset) * wave.amplitude;
          const yPos = wave.y + relativeY;
          x === 0 ? ctx.moveTo(x, yPos) : ctx.lineTo(x, yPos);
        }
        ctx.stroke();

        // Alt Simetrik Dalga
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const relativeY = Math.sin(x * wave.length + wave.offset) * (wave.amplitude * 0.8);
          const yPosSimetri = wave.y - relativeY;
          x === 0 ? ctx.moveTo(x, yPosSimetri) : ctx.lineTo(x, yPosSimetri);
        }
        ctx.stroke();

        wave.offset += wave.speed;
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasHeight]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className} 
      style={{ display: 'block', width: '100%', height: canvasHeight }} 
    />
  );
}
