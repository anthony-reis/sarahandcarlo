'use client';
import { useState, useEffect } from 'react';

const WEDDING_DATE = new Date('2026-12-12T15:30:00');

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      // Cálculo de meses e dias restantes de forma precisa
      let months = (WEDDING_DATE.getFullYear() - now.getFullYear()) * 12 + (WEDDING_DATE.getMonth() - now.getMonth());
      
      // Cria uma data temporária para verificar se o dia do mês já passou
      const tempDate = new Date(now);
      tempDate.setMonth(now.getMonth() + months);
      
      // Se a data temporária for maior que a data do casamento, removemos um mês
      if (tempDate > WEDDING_DATE) {
        months--;
        tempDate.setMonth(now.getMonth() + months);
      }

      const daysDiff = Math.floor((WEDDING_DATE.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));

      setTimeLeft({
        months: Math.max(0, months),
        days: daysDiff,
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Meses', value: timeLeft.months },
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.mins },
    { label: 'Segundos', value: timeLeft.secs },
  ];

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-8 md:gap-x-12 mt-10 justify-center max-w-[600px] mx-auto">
      {items.map((item) => (
        <div key={item.label} className="text-center min-w-[60px] transition-transform duration-300 hover:scale-[1.08] group">
          <span className="font-garamond text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-creamy block leading-none transition-colors duration-300 group-hover:text-white">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="font-montserrat text-[0.5rem] tracking-[0.25em] uppercase text-white/40 block mt-2">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
