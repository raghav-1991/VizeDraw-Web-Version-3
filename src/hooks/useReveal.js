import { useLayoutEffect, useRef } from 'react';

/**
 * Adds `is-in` when the element scrolls into view. Anything already on screen at mount is marked visible
 * before first paint, so the page is complete at rest; only content below the fold animates in.
 */
export default function useReveal() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!('IntersectionObserver' in window) || r.top < window.innerHeight) { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
