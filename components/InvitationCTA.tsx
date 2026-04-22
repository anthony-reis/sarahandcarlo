'use client';
import { useEffect, useRef } from 'react';

export default function InvitationCTA() {
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
    <section id="invitation-cta" ref={sectionRef} className="px-8 w-full text-center">
      <p className="reveal font-garamond font-light text-[clamp(1.4rem,3vw,2rem)] leading-[1.7] text-dark max-w-[700px] mx-auto">
        Com o coração cheio de alegria, convidamos você a viver conosco este momento tão especial.
        A cada dia que passa, nos aproximamos ainda mais desse sonho que em breve se tornará realidade.
      </p>
    </section>
  );
}
