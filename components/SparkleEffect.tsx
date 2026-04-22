'use client';
import { useEffect } from 'react';

export default function SparkleEffect() {
  useEffect(() => {
    const createSparkle = (e: MouseEvent) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      
      // Usando as variáveis CSS definidas no :root
      sparkle.style.position = 'fixed';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '9998';
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.borderRadius = '50%';
      sparkle.style.backgroundColor = 'var(--cappuccino)';
      sparkle.style.opacity = '0';
      sparkle.style.animation = 'sparkleAnim 0.8s ease forwards';

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    };

    window.addEventListener('mousemove', createSparkle);
    return () => window.removeEventListener('mousemove', createSparkle);
  }, []);

  return null;
}
