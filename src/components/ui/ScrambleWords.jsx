import { useEffect, useRef } from 'react';

const NOISE = '▚▞▙▟░▒▓<>/\\_#01';
const DECODE_MS = 720;

/**
 * Cycles through `words`, decoding each one in left to right through a burst of terminal glyphs.
 * Purely visual — pair it with a visually-hidden static label. With reduced motion it shows the first word only.
 */
export default function ScrambleWords({ words, hold = 2600, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || words.length < 2) return;
    const el = ref.current;
    let i = 0, raf = 0, t = 0;

    const decode = (from, to) => {
      const start = performance.now(), n = Math.max(from.length, to.length);
      const frame = (now) => {
        const p = Math.min(1, (now - start) / DECODE_MS);
        let out = '';
        for (let k = 0; k < n; k++) {
          const settle = 0.3 + (k / n) * 0.7; // later characters resolve later
          if (p >= settle) out += to[k] ?? '';
          else if (p >= settle - 0.45) out += to[k] === ' ' ? ' ' : NOISE[(Math.random() * NOISE.length) | 0];
          else out += from[k] ?? '';
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(frame);
        else t = setTimeout(next, hold);
      };
      raf = requestAnimationFrame(frame);
    };
    const next = () => { const from = words[i]; i = (i + 1) % words.length; decode(from, words[i]); };

    t = setTimeout(next, hold + 1200);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); el.textContent = words[0]; };
  }, [words, hold]);

  return <span ref={ref} className={`scramble ${className}`}>{words[0]}</span>;
}
