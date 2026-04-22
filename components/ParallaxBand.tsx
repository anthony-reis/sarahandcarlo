'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBandProps {
  /** URL da foto principal do casal (Firebase Storage). Usa placeholder se vazio. */
  imageUrl?: string;
}

export default function ParallaxBand({ imageUrl }: ParallaxBandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Translação mais suave e ampla para um efeito premium
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div className="w-full h-[70vh] relative overflow-hidden" ref={containerRef}>
      <motion.div 
        className="absolute -inset-[10%] will-change-transform"
        style={{ y }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Foto do casal" className="w-full h-full object-cover transition-transform duration-800" />
        ) : (
          <div className="w-full h-full bg-creamy flex items-center justify-center font-montserrat text-[0.65rem] tracking-[0.15em] text-cappuccino uppercase border-none relative overflow-hidden group">
             <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(176,137,104,0.08)_8px,rgba(176,137,104,0.08)_9px)]" />
             <span className="relative">foto do casal — imagem principal</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
