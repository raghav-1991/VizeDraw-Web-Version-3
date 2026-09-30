import { useEffect, useRef } from 'react';

// Every mounted Glitch registers here; one shared timer glitches a random one every few seconds.
const live = new Set();
let timer = 0;
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function fire(el) {
  el.classList.remove('is-glitching');
  void el.offsetWidth; // restart the animation if it is mid-run
  el.classList.add('is-glitching');
  setTimeout(() => el.classList.remove('is-glitching'), 700);
}

/** Text with an RGB-split slice glitch: once shortly after mount, on hover, and at random across the page. */
export default function Glitch({ text, as: Tag = 'span', className = '', delay = 300, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (still()) return;
    const el = ref.current;
    live.add(el);
    if (!timer) timer = setInterval(() => { const all = [...live]; if (all.length) fire(all[Math.floor(Math.random() * all.length)]); }, 5200);
    const t = setTimeout(() => fire(el), delay);
    return () => {
      clearTimeout(t);
      live.delete(el);
      if (!live.size) { clearInterval(timer); timer = 0; }
    };
  }, [delay]);
  return (
    <Tag ref={ref} className={`glitch ${className}`} data-text={text} onPointerEnter={() => !still() && fire(ref.current)} {...rest}>
      {children ?? text}
    </Tag>
  );
}
