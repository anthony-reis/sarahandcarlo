'use client';

export default function MapSection() {
  return (
    <section id="map-section" className="reveal">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.1!2d-43.8619!3d-16.7244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x756a5f3f7f2d3d%3A0x0!2sR.%20Santa%20Bernadete%2C%20122%20-%20Todos%20Os%20Santos%2C%20Montes%20Claros%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da cerimônia"
        />
      </div>
    </section>
  );
}
