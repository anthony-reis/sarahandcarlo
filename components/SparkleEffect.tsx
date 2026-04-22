'use client';
import { useEffect } from 'react';

export default function SparkleEffect() {
  useEffect(() => {
    let lastSparkle = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (Date.now() - lastSparkle < 120) return;
      lastSparkle = Date.now();
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = `${e.clientX - 3}px`;
      s.style.top  = `${e.clientY - 3}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null; // sem markup — apenas efeito de cursor
}
