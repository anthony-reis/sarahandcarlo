'use client';
import { useState, useEffect } from 'react';

interface CountdownState {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_DATE = new Date('2026-12-12T15:30:00');

function calcCountdown(): CountdownState {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    months:  Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)),
    days:    Math.floor((diff / (1000 * 60 * 60 * 24)) % 30.44),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<CountdownState>(calcCountdown());

  useEffect(() => {
    const id = setInterval(() => setTime(calcCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { value: time.months,  label: 'Meses' },
    { value: time.days,    label: 'Dias' },
    { value: time.hours,   label: 'Horas' },
    { value: time.minutes, label: 'Minutos' },
    { value: time.seconds, label: 'Segundos' },
  ];

  return (
    <div className="countdown" id="countdown">
      {items.map(({ value, label }) => (
        <div key={label} className="countdown-item">
          <span className="num">{String(value).padStart(2, '0')}</span>
          <span className="unit">{label}</span>
        </div>
      ))}
    </div>
  );
}
