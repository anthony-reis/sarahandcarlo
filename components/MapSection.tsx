import { useEffect, useRef } from 'react';

export default function MapSection() {
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
    <section id="map-section" ref={sectionRef} className="px-8 w-full max-w-[1100px] mx-auto mb-10">
      <div className="relative group overflow-hidden rounded-[40px] shadow-2xl shadow-caramel/10 reveal">
        {/* Overlay sutil para "aquecer" o mapa e combinar com o bege/caramel */}
        <div className="absolute inset-0 bg-caramel/5 pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-0" />
        
        <div className="w-full h-[450px] overflow-hidden grayscale-[0.2] sepia-[0.3] brightness-[0.95] contrast-[1.1] saturate-[0.8] transition-all duration-700 group-hover:sepia-0 group-hover:grayscale-0 group-hover:saturate-100 group-hover:brightness-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.1!2d-43.8619!3d-16.7244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x756a5f3f7f2d3d%3A0x0!2sR.%20Santa%20Bernadete%2C%20122%20-%20Todos%20Os%20Santos%2C%20Montes%20Claros%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da cerimônia"
            className="w-full h-full border-none"
          />
        </div>

        {/* Botão flutuante para abrir no maps real */}
        <a 
          href="https://maps.app.goo.gl/9R2yE8G9hL8zXhXv9" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-md text-caramel px-6 py-3 rounded-full font-montserrat text-[0.65rem] tracking-[0.2em] uppercase shadow-lg transition-all duration-300 hover:bg-caramel hover:text-white"
        >
          Ver no Google Maps
        </a>
      </div>
    </section>
  );
}
