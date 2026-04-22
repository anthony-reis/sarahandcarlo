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
    <section id="invitation" ref={sectionRef} className="px-8 w-full max-w-[800px] mx-auto text-center">
      <p className="font-montserrat text-[0.65rem] tracking-[0.5em] uppercase text-caramel mb-8 reveal">Um convite especial</p>
      <h2 className="font-garamond font-light text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.5] text-dark mb-8 reveal [transition-delay:0.15s]">Maravilhas o Senhor fez em nossas vidas!</h2>
      <p className="font-poppins text-[0.95rem] font-light leading-[1.9] text-text-muted reveal [transition-delay:0.3s]">
        O nosso grande dia está chegando e preparamos cada detalhe com muito amor e carinho.
        Tê-los ao nosso lado torna tudo ainda mais especial. Abaixo, vocês encontrarão
        informações importantes para celebrarem este momento conosco.
      </p>
    </section>
  );
}
