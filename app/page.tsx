'use client';
import Preloader      from '@/components/Preloader';
import Navbar         from '@/components/Navbar';
import Hero           from '@/components/Hero';
import Invitation     from '@/components/Invitation';
import ParallaxBand   from '@/components/ParallaxBand';
import History        from '@/components/History';
import Gallery        from '@/components/Gallery';
import InvitationCTA  from '@/components/InvitationCTA';
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

      <main className="flex flex-col gap-[80px] pb-20">
        <Hero />

        <Invitation />

        {/* Foto principal do casal */}
        <section className="w-full px-8">
          <ParallaxBand imageUrl="/fotos/casal-principal.jpg" />
        </section>

        <History />

        <Gallery />

        <InvitationCTA />

        <CeremonyCard />

        <MapSection />

        <div className="flex justify-center items-center w-full px-8 mt-2">
          <a
            href="/presentes"
            className="bg-mocha text-white font-montserrat text-[0.7rem] md:text-[0.8rem] tracking-[0.2em] uppercase py-4 px-12 rounded-full hover:bg-dark transition-all duration-300 shadow-xl shadow-mocha/20 hover:shadow-mocha/40 text-center"
          >
            Lista de Presentes
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
