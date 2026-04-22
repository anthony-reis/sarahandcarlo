'use client';
import { useEffect, useRef } from 'react';

export default function Invitation() {
  const sectionRef = useRef<HTMLElement>(null);

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
  }, []);

  return (
    <section id="invitation" ref={sectionRef}>
      <p className="section-label reveal">Um convite especial</p>
      <h2 className="reveal reveal-delay-1">Maravilhas o Senhor fez em nossas vidas!</h2>
      <p className="reveal reveal-delay-2">
        O nosso grande dia está chegando e preparamos cada detalhe com muito amor e carinho.
        Tê-los ao nosso lado torna tudo ainda mais especial. Abaixo, vocês encontrarão
        informações importantes para celebrarem este momento conosco.
      </p>
    </section>
  );
}
