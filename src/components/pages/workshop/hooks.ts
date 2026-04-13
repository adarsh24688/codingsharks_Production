'use client';
import { useEffect, useState } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal],[data-reveal-left],[data-reveal-right],[data-reveal-up]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useCountdown(eventDate: string | null, eventTime: string | null) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const COUNTDOWN_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
    const getTargetTime = () => Date.now() + COUNTDOWN_DURATION;
    let target = getTargetTime();
    
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        target = getTargetTime(); // Restart timer
        setT({ days: 0, hours: 0, minutes: 10, seconds: 0 });
        return;
      }
      setT({ 
        days: 0, 
        hours: 0, 
        minutes: Math.floor(diff / 60000), 
        seconds: Math.floor((diff % 60000) / 1000) 
      });
    };
    tick(); 
    const id = setInterval(tick, 1000); 
    return () => clearInterval(id);
  }, []);
  return t;
}

export function useStickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return visible;
}
