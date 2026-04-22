'use client';
import { useEffect, useRef } from 'react';

export default function History() {
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
    <section id="history" ref={sectionRef} className="px-8 w-full max-w-[900px] mx-auto">
      <p className="font-montserrat text-[0.65rem] tracking-[0.5em] uppercase text-caramel text-center mb-8 reveal">Nossa História</p>
      <h2 className="font-garamond font-light text-[clamp(2rem,5vw,3.5rem)] text-center text-dark mb-12 reveal [transition-delay:0.15s]">O começo do nosso pra sempre</h2>
      
      <div className="columns-1 md:columns-2 gap-12 reveal [transition-delay:0.3s]">
        <p className="font-poppins text-[0.9rem] font-light leading-[1.9] text-text-muted mb-6">
          E então, o nosso casamento chegou. Ao longo desses nove anos juntos, fomos testemunhas do nascimento de novas famílias, sete ao todo, e hoje, pela graça de Deus, é a nossa vez de iniciar a nossa.
        </p>
        <p className="font-poppins text-[0.9rem] font-light leading-[1.9] text-text-muted mb-6">
          Ainda muito jovens e com poucas certezas, nos aproximamos devagar. Foi no tempo, e com o tempo, que nosso amor se fortaleceu, assim como a admiração silenciosa que aprendemos a cultivar um pelo outro.
        </p>
        <p className="font-poppins text-[0.9rem] font-light leading-[1.9] text-text-muted mb-6">
          Tornou-se nosso propósito cuidar, escolher e fazer da felicidade do outro um compromisso diário.
        </p>
        <p className="font-poppins text-[0.9rem] font-light leading-[1.9] text-text-muted mb-6">
          Ao olhar para trás, é impossível não reconhecer a delicadeza de Deus em cada detalhe da nossa história. Foi Ele quem nos sustentou, nos guiou e nos trouxe, com amor e fidelidade, até aqui.
        </p>
      </div>
    </section>
  );
}
