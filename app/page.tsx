'use client';
import Preloader      from '@/components/Preloader';
import Navbar         from '@/components/Navbar';
import Hero           from '@/components/Hero';
import Invitation     from '@/components/Invitation';
import ParallaxBand   from '@/components/ParallaxBand';
import History        from '@/components/History';
import Gallery        from '@/components/Gallery';
import CeremonyCard   from '@/components/CeremonyCard';
import MapSection     from '@/components/MapSection';
import Footer         from '@/components/Footer';
import SparkleEffect  from '@/components/SparkleEffect';

export default function Home() {
  return (
    <>
      <Preloader />
      <SparkleEffect />
      <Navbar />

      <main>
        <Hero />

        <Invitation />

        {/* Foto principal do casal — adicione a URL do Firebase Storage em imageUrl */}
        <ParallaxBand imageUrl="" />

        <History />

        <Gallery />

        {/* CTA entre galeria e cerimônia */}
        <section id="invitation-cta">
          <p className="reveal">
            Com o coração cheio de alegria, convidamos você a viver conosco este momento tão especial.
            A cada dia que passa, nos aproximamos ainda mais desse sonho que em breve se tornará realidade.
          </p>
        </section>

        <CeremonyCard />

        <MapSection />
      </main>

      <Footer />
    </>
  );
}
