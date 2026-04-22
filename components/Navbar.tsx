'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 100);
    };
    if (isHome) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      navRef.current?.classList.add('scrolled');
    }
  }, [isHome]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <nav id="mainNav" ref={navRef}>
      <a href={isHome ? '#hero' : '/#hero'}           onClick={(e) => scrollTo(e, 'hero')}>Início</a>
      <a href={isHome ? '#invitation' : '/#invitation'} onClick={(e) => scrollTo(e, 'invitation')}>Convite</a>
      <a href={isHome ? '#history' : '/#history'}     onClick={(e) => scrollTo(e, 'history')}>História</a>
      <a href={isHome ? '#about' : '/#about'}         onClick={(e) => scrollTo(e, 'about')}>Cerimônia</a>
      <a href="/presentes">Presentes</a>
    </nav>
  );
}
