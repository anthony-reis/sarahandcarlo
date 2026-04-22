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
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    section.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      <div className="hero-ornament hero-ornament-1" />
      <div className="hero-ornament hero-ornament-2" />
      <div className="hero-ornament hero-ornament-3" />

      <p className="hero-label reveal">Celebrando nosso amor</p>
      <h1 className="hero-names reveal reveal-delay-1">
        Sarah
        <span className="amp">&amp;</span>
        Carlo
      </h1>
      <p className="hero-date reveal reveal-delay-2">
        12 de Dezembro de 2026 · Montes Claros, MG
      </p>

      <div className="hero-scroll">
        <span>Continue</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
