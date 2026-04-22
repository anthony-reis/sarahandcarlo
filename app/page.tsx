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

        {/* Foto principal do casal — adicione a URL do Firebase Storage em imageUrl */}
        <section className="w-full overflow-hidden">
          <ParallaxBand imageUrl="" />
        </section>

        <History />

        <Gallery />

        <InvitationCTA />

        <CeremonyCard />

        <MapSection />
      </main>

      <Footer />
    </>
  );
}
