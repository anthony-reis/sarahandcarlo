'use client';
import { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('preloader')?.classList.add('opacity-0', 'invisible');
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="preloader"
      className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center transition-all duration-[800ms] ease-in-out pointer-events-none"
    >
      <h1 className="font-garamond font-light text-[clamp(2.5rem,8vw,5rem)] text-creamy tracking-[0.15em] opacity-0 animate-preloader-fade">
        Sarah &amp; Carlo
      </h1>
      <div className="w-20 h-px bg-cappuccino mt-6 scale-x-0 animate-line-grow" />
      <p className="font-montserrat text-[0.75rem] tracking-[0.4em] text-cappuccino mt-4 opacity-0 animate-preloader-fade [animation-delay:1s]">
        12 · 12 · 2026
      </p>
    </div>
  );
}
