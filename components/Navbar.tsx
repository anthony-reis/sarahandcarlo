'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Início', id: 'hero' },
  { name: 'Convite', id: 'invitation' },
  { name: 'História', id: 'history' },
  { name: 'Cerimônia', id: 'about' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Estados individuais para cada elemento
  const [hamburgerDark, setHamburgerDark] = useState(false);
  const [titleDark, setTitleDark] = useState(false);
  const [desktopDark, setDesktopDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const checkOverlap = (elId: string) => {
        const el = document.getElementById(elId);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        // Pega o ponto central do elemento
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        let isDark = false;
        document.querySelectorAll('.bg-dark:not(.pointer-events-none)').forEach((section) => {
          const sRect = section.getBoundingClientRect();
          if (x >= sRect.left && x <= sRect.right && y >= sRect.top && y <= sRect.bottom) {
            isDark = true;
          }
        });
        return isDark;
      };

      setHamburgerDark(checkOverlap('nav-hamburger'));
      setTitleDark(checkOverlap('nav-title'));
      setDesktopDark(checkOverlap('nav-desktop-links'));
    };

    if (isHome) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHome]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const getTextColor = (isOverDark: boolean) => isOverDark ? 'text-creamy' : 'text-dark';
  const getLineColor = (isOverDark: boolean) => isOverDark ? 'bg-creamy' : 'bg-cappuccino';

  return (
    <>
      <nav 
        id="mainNav" 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 transition-all duration-500 ease-in-out ${
          isScrolled ? 'py-4' : 'py-6'
        } ${
          isScrolled 
            ? 'bg-transparent backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Mobile Navbar */}
        <div className="flex md:hidden items-center justify-between w-full h-full">
          <button 
            id="nav-hamburger"
            onClick={() => setIsMobileMenuOpen(true)}
            className={`${getTextColor(hamburgerDark)} p-2 -ml-2 transition-colors duration-300`}
            aria-label="Abrir menu"
          >
            <FiMenu size={24} />
          </button>
          
          <span 
            id="nav-title"
            className={`font-garamond font-medium text-xl ${getTextColor(titleDark)} tracking-widest absolute left-1/2 -translate-x-1/2 transition-colors duration-300`}
          >
            Sarah &amp; Carlo
          </span>
          
          <div className="w-10"></div> {/* Spacer to keep title centered */}
        </div>

        {/* Desktop Navbar */}
        <div id="nav-desktop-links" className="hidden md:flex justify-center items-center gap-10 w-full">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={isHome ? `#${item.id}` : `/#${item.id}`}           
              onClick={(e) => scrollTo(e, item.id)}
              className={`font-montserrat text-[0.7rem] font-normal tracking-[0.3em] uppercase ${getTextColor(desktopDark)} relative group transition-colors duration-300`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 w-full h-px ${getLineColor(desktopDark)} scale-x-0 origin-right transition-transform duration-350 ease-out group-hover:scale-x-100 group-hover:origin-left`} />
            </a>
          ))}
          <a 
            href="/presentes"
            className={`font-montserrat text-[0.7rem] font-normal tracking-[0.3em] uppercase ${getTextColor(desktopDark)} relative group transition-colors duration-300`}
          >
            Presentes
            <span className={`absolute -bottom-1 left-0 w-full h-px ${getLineColor(desktopDark)} scale-x-0 origin-right transition-transform duration-350 ease-out group-hover:scale-x-100 group-hover:origin-left`} />
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-bg/95 backdrop-blur-sm z-[200] flex flex-col items-center justify-center md:hidden"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-dark p-2"
              aria-label="Fechar menu"
            >
              <FiX size={28} strokeWidth={1} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                  href={isHome ? `#${item.id}` : `/#${item.id}`}           
                  onClick={(e) => scrollTo(e, item.id)}
                  className="font-montserrat text-[0.7rem] font-light tracking-[0.4em] uppercase text-dark relative group"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.4, ease: 'easeOut' }}
                href="/presentes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-montserrat text-[0.7rem] font-light tracking-[0.4em] uppercase text-dark mt-4 relative"
              >
                Presentes
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-[1px] bg-cappuccino/50" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
