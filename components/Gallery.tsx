'use client';
import { useEffect, useState, useRef } from 'react';
import { storage } from '@/lib/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const GALLERY_FOLDER = 'gallery'; // pasta no Firebase Storage

export default function Gallery() {
  const [urls, setUrls] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Busca as fotos do Firebase Storage
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderRef = ref(storage, GALLERY_FOLDER);
        const result = await listAll(folderRef);
        const downloadUrls = await Promise.all(
          result.items.map((item) => getDownloadURL(item))
        );
        setUrls(downloadUrls);
      } catch {
        // Firebase não configurado ou pasta vazia — usa placeholders
        setUrls([]);
      }
    };
    fetchImages();
  }, []);

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
  }, [urls]);

  const slots = [1, 2, 3];

  return (
    <section id="gallery" ref={sectionRef} className="px-8 w-full max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 w-full">
        {slots.map((slot, i) => (
          <div 
            key={slot} 
            className={`
              overflow-hidden rounded-lg shadow-xl shadow-dark/5 reveal w-full
              ${i === 0 ? 'h-[400px] md:h-[524px] md:row-span-2' : 'h-[250px]'}
              [transition-delay:${i * 0.15}s]
            `}
          >
            {urls[i] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={urls[i]} 
                alt={`Foto ${slot}`} 
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out hover:scale-105" 
              />
            ) : (
              <div className="w-full h-full bg-creamy flex items-center justify-center font-montserrat text-[0.65rem] tracking-[0.15em] text-cappuccino uppercase border border-dashed border-cappuccino relative overflow-hidden group">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(176,137,104,0.08)_8px,rgba(176,137,104,0.08)_9px)]" />
                <span className="relative transition-transform duration-[800ms] ease-out group-hover:scale-105">foto {slot}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
