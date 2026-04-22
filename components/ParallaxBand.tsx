'use client';
import { useEffect, useRef } from 'react';

interface ParallaxBandProps {
  /** URL da foto principal do casal (Firebase Storage). Usa placeholder se vazio. */
  imageUrl?: string;
}

export default function ParallaxBand({ imageUrl }: ParallaxBandProps) {
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const handleScroll = () => {
      const rect = band.parentElement!.getBoundingClientRect();
      const progress = -rect.top / (window.innerHeight + rect.height);
      band.style.transform = `translateY(${progress * 60}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="image-band">
      <div className="band-inner" ref={bandRef}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Foto do casal" className="gallery-img" />
        ) : (
          <div className="img-placeholder">foto do casal — imagem principal</div>
        )}
      </div>
    </div>
  );
}
