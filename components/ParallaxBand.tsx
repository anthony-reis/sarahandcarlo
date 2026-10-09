'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBandProps {
  /** URL da foto principal do casal. Usa placeholder se vazio. */
  imageUrl?: string;
}

export default function ParallaxBand({ imageUrl }: ParallaxBandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Translação suave; a sobra vertical (-inset-y) cobre o deslocamento
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <div className="w-full max-w-[720px] mx-auto aspect-[4/5] md:aspect-square relative overflow-hidden rounded-lg shadow-xl shadow-dark/5" ref={containerRef}>
      <motion.div 
        className="absolute inset-x-0 -inset-y-[6%] will-change-transform"
        style={{ y }}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="Sarah e Carlo abraçados sorrindo" fill sizes="(min-width: 784px) 720px, 100vw" quality={80} className="object-cover object-[55%_45%]" />
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
