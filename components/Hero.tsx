"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          } else {
            e.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.15 },
    );
    section.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-16 relative"
    >
      <div className="hidden md:block absolute w-48 h-48 border border-cappuccino rounded-full opacity-30 top-[10%] left-[8%] animate-float-orb" />
      <div className="hidden md:block absolute w-[140px] h-[140px] border border-cappuccino rounded-full opacity-30 bottom-[15%] right-[6%] animate-float-orb [animation-delay:2s]" />
      <div className="hidden md:block absolute w-20 h-20 border border-cappuccino rounded-full opacity-30 top-[20%] right-[15%] animate-float-orb [animation-delay:1s]" />

      <p className="font-montserrat text-[0.7rem] font-normal tracking-[0.5em] uppercase text-text-muted mb-8 reveal">
        Celebrando nosso amor
      </p>
      <h1 className="font-garamond font-light text-[clamp(3rem,10vw,7rem)] leading-[1.1] text-dark reveal [transition-delay:0.15s]">
        Sarah
        <span className="block italic text-[0.5em] text-cappuccino my-[0.3em]">&amp;</span>
        Carlo
      </h1>
      <p className="font-montserrat text-[0.8rem] font-light tracking-[0.4em] text-text-muted mt-10 reveal [transition-delay:0.3s]">
        12 de Dezembro de 2026 · Montes Claros, MG
      </p>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-montserrat text-[0.6rem] tracking-[0.3em] text-cappuccino uppercase">Continue</span>
        <div className="w-px h-[50px] bg-gradient-to-b from-cappuccino to-transparent animate-scroll-pulse" />
      </div>
    </section>
  );
}
