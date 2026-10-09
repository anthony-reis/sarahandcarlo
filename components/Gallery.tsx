'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const PHOTOS = [
  { src: '/fotos/galeria-1.jpg', alt: 'Sarah e Carlo se olhando diante de uma janela', position: 'object-[50%_45%]' },
  { src: '/fotos/galeria-2.jpg', alt: 'Sarah e Carlo sentados em frente a uma igreja histórica', position: 'object-[50%_60%]' },
  { src: '/fotos/galeria-3.jpg', alt: 'Sarah e Carlo de mãos dadas diante de uma porta antiga', position: 'object-[50%_35%]' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  // Reveal animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { 
            e.target.classList.add('visible'); 
          } else {
            e.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="px-8 w-full max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 w-full">
        {PHOTOS.map((photo, i) => (
          <div 
            key={photo.src} 
            className={`
              relative overflow-hidden rounded-lg shadow-xl shadow-dark/5 reveal w-full
              ${i === 0 ? 'h-[400px] md:h-[524px] md:row-span-2' : 'h-[250px]'}
              [transition-delay:${i * 0.15}s]
            `}
          >
            <Image 
              src={photo.src} 
              alt={photo.alt} 
              fill
              sizes={i === 0 ? '(min-width: 768px) 700px, 100vw' : '(min-width: 768px) 470px, 100vw'}
              quality={80}
              className={`object-cover ${photo.position} transition-transform duration-[800ms] ease-out hover:scale-105`} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
