import { useCallback } from 'react';

/** Pointer-follow highlight: writes --mx/--my on the element; CSS draws the glow and border light. */
export default function useSpotlight() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
}
