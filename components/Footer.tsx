'use client';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white py-16 px-8 text-center relative ">
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-caramel flex items-center justify-center cursor-pointer border-none text-white text-xl transition-transform duration-300 ease-out hover:scale-110 shadow-xl shadow-dark/30"
      >
        ↑
      </button>
      
      <h2 className="font-garamond font-light text-[clamp(2rem,5vw,3rem)] mb-8">Sarah &amp; Carlo</h2>
      
      <blockquote className="font-garamond text-lg italic leading-[1.8] text-cappuccino max-w-[600px] mx-auto mb-4">
        "Deus mudou o teu caminho até juntares com o meu e guardou a tua vida separando-a para mim. Para onde fores, irei. Onde tu repousares, repousarei. Teu Deus será o meu Deus. Teu caminho o meu será."
      </blockquote>
      
      <p className="font-montserrat text-[0.65rem] tracking-[0.3em] text-white/40 mb-8 uppercase">Rute 1:16-17</p>
      
      <div className="font-poppins text-[0.85rem] font-light text-cappuccino mt-8 leading-relaxed px-4">
        Somos muito gratos por terem caminhado conosco até aqui.<br />
        Cada um de vocês tem um lugar especial em nossos corações.
        <p className="font-garamond text-lg text-white/50 mt-4">12.12.2026</p>
      </div>
    </footer>
  );
}
