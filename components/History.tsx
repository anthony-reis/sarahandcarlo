"use client";
import { useEffect, useRef } from "react";

export default function History() {
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
    <section id="history" ref={sectionRef}>
      <p className="section-label reveal">Nossa história</p>
      <h2 className="reveal reveal-delay-1">O começo do nosso para sempre</h2>
      <div className="history-text">
        <p className="reveal reveal-delay-2">
          E então, o nosso casamento chegou. Ao longo desses nove anos juntos,
          fomos testemunhas do nascimento de novas famílias, sete ao todo, e
          hoje, pela graça de Deus, é a nossa vez de iniciar a nossa.
        </p>
        <p className="reveal reveal-delay-2">
          Ainda muito jovens e com poucas certezas, nos aproximamos devagar. Foi
          no tempo, e com o tempo, que nosso amor se fortaleceu, assim como a
          admiração silenciosa que aprendemos a cultivar um pelo outro.
          Tornou-se nosso propósito cuidar, escolher e fazer da felicidade do
          outro um compromisso diário.
        </p>
        <p className="reveal reveal-delay-3">
          Ao olhar para trás, é impossível não reconhecer a delicadeza de Deus
          em cada detalhe da nossa história. Foi Ele quem nos sustentou, nos
          guiou e nos trouxe, com amor e fidelidade, até aqui.
        </p>
      </div>
    </section>
  );
}
