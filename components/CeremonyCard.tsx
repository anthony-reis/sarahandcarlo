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
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
      },
      { threshold: 0.15 }
    );
    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="gothic-card reveal">
        <div className="gothic-border" />
        <div className="gothic-corner-bl" />
        <div className="gothic-corner-br" />

        {/* Cruz gótica */}
        <svg className="gothic-cross" width="36" height="52" viewBox="0 0 36 52" fill="none">
          <line x1="18" y1="0" x2="18" y2="52" stroke="rgba(243,233,215,0.3)" strokeWidth="1"/>
          <line x1="7" y1="15" x2="29" y2="15" stroke="rgba(243,233,215,0.3)" strokeWidth="1"/>
          <circle cx="18" cy="15" r="5" stroke="rgba(243,233,215,0.18)" strokeWidth="0.6" fill="none"/>
          <circle cx="18" cy="15" r="2" stroke="rgba(243,233,215,0.12)" strokeWidth="0.5" fill="none"/>
        </svg>

        <p className="section-label">Cerimônia Religiosa</p>

        <h2>
          Paróquia Nossa Senhora do<br />
          Perpétuo Socorro e Todos os Santos
        </h2>

        <div className="gothic-divider" />

        <div className="gothic-detail">
          <p className="detail-label">Endereço</p>
          <p>R. Santa Bernadete, 122 — Todos Os Santos<br />Montes Claros — MG, 39400-138</p>
        </div>

        <div className="gothic-detail">
          <p className="detail-label">Data &amp; Horário</p>
          <p className="big-date">12 de Dezembro de 2026</p>
          <p className="big-time">15:30 horas</p>
        </div>

        <div className="gothic-divider" />

        <Countdown />
      </div>
    </section>
  );
}
