'use client';
import { useEffect, useRef } from 'react';
import Countdown from './Countdown';

export default function CeremonyCard() {
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
    <section id="about" ref={sectionRef} className="px-8 w-full relative">
      <div className="max-w-[850px] mx-auto text-center bg-dark text-caramel relative px-6 md:px-20 pt-32 md:pt-48 pb-20 md:pb-32 rounded-[60px] md:rounded-wedding reveal">
        {/* Arco Gótico (Igreja) */}
        <div className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 w-[140px] md:w-[180px] h-[200px] md:h-[280px] border border-caratext-caramel/20 rounded-t-[70px] md:rounded-t-[90px] border-b-0 pointer-events-none z-10" />
        
        {/* Borda Interna */}
        <div className="absolute inset-[18px] border border-caratext-caramel/15 pointer-events-none rounded-[42px] md:rounded-[110px]" />
        <div className="absolute bottom-[18px] left-[18px] w-8 h-8 border-l border-b border-caratext-caramel/25" />
        <div className="absolute bottom-[18px] right-[18px] w-8 h-8 border-r border-b border-caratext-caramel/25" />

        <span className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 text-[0.8rem] text-creamy opacity-50">✦</span>

        {/* Cruz gótica */}
        <svg className="mx-auto mb-10 mt-12 md:mt-20 opacity-45" width="40" height="60" viewBox="0 0 36 52" fill="none" style={{ overflow: 'visible' }}>
          <line x1="18" y1="0" x2="18" y2="52" stroke="rgba(243,233,215,0.4)" strokeWidth="1"/>
          <line x1="7" y1="15" x2="29" y2="15" stroke="rgba(243,233,215,0.4)" strokeWidth="1"/>
          <circle cx="18" cy="15" r="5" stroke="rgba(243,233,215,0.2)" strokeWidth="0.6" fill="none"/>
        </svg>

        <p className="font-montserrat text-[0.65rem] tracking-[0.6em] uppercase text-creamy mb-8 opacity-70">Cerimônia Religiosa</p>

        <h2 className="font-garamond font-normal text-[clamp(1.6rem,4vw,2.5rem)] text-caramel leading-[1.4] mb-12">
          Paróquia Nossa Senhora do<br />
          Perpétuo Socorro e Todos os Santos
        </h2>

        <div className="w-[120px] h-px mx-auto mb-12 bg-gradient-to-r from-transparent via-creamy to-transparent opacity-35" />

        <div className="mb-10">
          <p className="font-montserrat text-[0.6rem] tracking-[0.4em] uppercase text-creamy opacity-60 mb-3">Endereço</p>
          <p className="font-garamond text-[clamp(1.2rem,2.8vw,1.5rem)] text-caramel/80 leading-relaxed px-4">R. Santa Bernadete, 122 — Todos Os Santos<br />Montes Claros — MG, 39400-138</p>
        </div>

        <div className="mb-10">
          <p className="font-montserrat text-[0.6rem] tracking-[0.4em] uppercase text-creamy opacity-60 mb-3">Data &amp; Horário</p>
          <p className="font-garamond text-[clamp(2.2rem,5.5vw,3.6rem)] font-semibold text-creamy tracking-tighter leading-none mt-1">12 de Dezembro de 2026</p>
          <p className="font-garamond text-[clamp(1.5rem,3.2vw,2rem)] font-light text-cappuccino mt-2">15:30 horas</p>
        </div>

        <div className="w-[120px] h-px mx-auto mb-12 bg-gradient-to-r from-transparent via-creamy to-transparent opacity-35" />

        <Countdown />
      </div>
    </section>
  );
}
