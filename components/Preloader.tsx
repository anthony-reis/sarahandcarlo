'use client';
import { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('preloader')?.classList.add('hide');
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader">
      <h1>Sarah &amp; Carlo</h1>
      <div className="preloader-line" />
      <p className="preloader-date">12 · 12 · 2026</p>
    </div>
  );
}
