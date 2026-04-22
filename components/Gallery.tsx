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
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
      },
      { threshold: 0.15 }
    );
    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [urls]);

  const slots = [1, 2, 3, 4, 5];

  return (
    <section id="gallery" ref={sectionRef}>
      <div className="mosaic">
        {slots.map((slot, i) => (
          <div key={slot} className={`tile reveal reveal-delay-${i}`}>
            {urls[i] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={urls[i]} alt={`Foto ${slot}`} className="gallery-img" />
            ) : (
              <div className="img-placeholder">foto {slot}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
