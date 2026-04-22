'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (navRef.current) {
        if (isScrolled) {
          navRef.current.classList.add('bg-bg/92', 'backdrop-blur-md', 'py-4', 'px-6', 'shadow-2xl', 'shadow-caramel/5');
        } else {
          navRef.current.classList.remove('bg-bg/92', 'backdrop-blur-md', 'py-4', 'px-6', 'shadow-2xl', 'shadow-caramel/5');
        }
      }
    };
    if (isHome) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      navRef.current?.classList.add('bg-bg/92', 'backdrop-blur-md', 'py-4', 'px-6', 'shadow-2xl', 'shadow-caramel/5');
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
    <nav 
      id="mainNav" 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] py-6 px-12 flex justify-center items-center gap-4 md:gap-10 transition-all duration-500 ease-in-out bg-transparent"
    >
      {[
        { name: 'Início', id: 'hero' },
        { name: 'Convite', id: 'invitation' },
        { name: 'História', id: 'history' },
        { name: 'Cerimônia', id: 'about' },
      ].map((item) => (
        <a 
          key={item.id}
          href={isHome ? `#${item.id}` : `/#${item.id}`}           
          onClick={(e) => scrollTo(e, item.id)}
          className="font-montserrat text-[0.55rem] md:text-[0.7rem] font-normal tracking-[0.2em] md:tracking-[0.3em] uppercase text-dark relative group transition-colors duration-300"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-full h-px bg-cappuccino scale-x-0 origin-right transition-transform duration-350 ease-out group-hover:scale-x-100 group-hover:origin-left" />
        </a>
      ))}
      <a 
        href="/presentes"
        className="font-montserrat text-[0.55rem] md:text-[0.7rem] font-normal tracking-[0.2em] md:tracking-[0.3em] uppercase text-dark relative group transition-colors duration-300"
      >
        Presentes
        <span className="absolute -bottom-1 left-0 w-full h-px bg-cappuccino scale-x-0 origin-right transition-transform duration-350 ease-out group-hover:scale-x-100 group-hover:origin-left" />
      </a>
    </nav>
  );
}
