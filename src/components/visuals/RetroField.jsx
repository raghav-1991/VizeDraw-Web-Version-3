import { useEffect, useRef } from 'react';

const D = Math.SQRT1_2; // stars travel at 45°, down and to the right
const STRIPE = 8; // stripe pattern repeat (4px lit + 4px clear), measured across the stripes
const STRIPE_PERIOD = STRIPE / D; // its vertical repeat — keeps the scroll drift seamless
const MAX_LIVE = 3;
const rand = (a, b) => a + Math.random() * (b - a);
const pad = (n, w) => String(n).padStart(w, '0');

/**
 * Page backdrop and HUD: drafting stripes that drift with scroll, dot-matrix edges, scanlines, a soft vignette and
 * the occasional diagonal "shooting star" streak drawn on a canvas. Also drives the scroll progress bar and readout.
 * Everything is decorative; with reduced motion the stripes and streaks stay still.
 */
export default function RetroField() {
  const canvas = useRef(null);
  const readout = useRef(null);

  // Scroll: parallax offset for the stripes, progress for the HUD.
  useEffect(() => {
    const root = document.documentElement;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let queued = false;
    const update = () => {
      queued = false;
      const max = root.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      root.style.setProperty('--scroll', p.toFixed(4));
      if (readout.current) readout.current.textContent = `SCROLL ${pad(Math.round(p * 100), 3)}`;
      if (!still) root.style.setProperty('--field', `${(-((scrollY * 0.35) % STRIPE_PERIOD)).toFixed(2)}px`);
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, []);

  // Star light: at most three shooting stars at a time. Each one rides down-right inside one of the 45° stripes
  // (the canvas shares the stripe layer's box and scroll offset, so they stay aligned) as a fading tail with a
  // soft glow and a white-hot core, blended additively.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const css = getComputedStyle(document.documentElement);
    const rgb = css.getPropertyValue('--star-rgb').trim() || '127, 214, 216';
    const c = (a) => `rgba(${rgb}, ${a})`;
    let W = 0, H = 0, L = 0, sx = 0, sy = 0, live = [], next = rand(0.4, 1.2), last = 0, raf = 0;

    const size = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      W = Math.round(r.width) || innerWidth; H = Math.round(r.height) || innerHeight + 32;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // a 45° CSS gradient runs up-right through the box centre, (W + H)·√½ long, starting bottom-left
      L = (W + H) * D; sx = W / 2 - (D * L) / 2; sy = H / 2 + (D * L) / 2;
    };
    const spawn = () => {
      for (let tries = 0; tries < 8; tries++) {
        const a = Math.floor(Math.random() * (L / STRIPE)) * STRIPE + STRIPE / 4; // middle of a lit 4px band
        const bx = sx + D * a, by = sy - D * a; // a point on that stripe; the star moves along (√½, √½)
        const t0 = Math.max(-bx / D, -by / D), t1 = Math.min((W - bx) / D, (H - by) / D);
        if (t1 - t0 > 120) { live.push({ bx, by, t0, t1, len: rand(180, 300), speed: rand(170, 260), age: 0 }); return; }
      }
    };
    const draw = (st) => {
      const head = st.t0 + st.age * st.speed, tail = head - st.len;
      if (tail > st.t1) return false;
      const h = Math.min(head, st.t1), t = Math.max(st.t0, tail);
      const hx = st.bx + h * D, hy = st.by + h * D, tx = st.bx + t * D, ty = st.by + t * D;
      const g = ctx.createLinearGradient(tx, ty, hx, hy);
      g.addColorStop(0, c(0)); g.addColorStop(0.7, c(0.22)); g.addColorStop(1, c(0.5));
      ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = g;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
      if (head <= st.t1) {
        const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 10);
        glow.addColorStop(0, c(0.5)); glow.addColorStop(0.35, c(0.16)); glow.addColorStop(1, c(0));
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(hx, hy, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(235, 250, 255, 0.9)'; ctx.beginPath(); ctx.arc(hx, hy, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      return true;
    };
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      next -= dt;
      if (next <= 0 && live.length < MAX_LIVE) { next = rand(0.7, 2); spawn(); }
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      live = live.filter((st) => { st.age += dt; return draw(st); });
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const onVis = () => (document.hidden ? stop() : start());

    size(); start();
    addEventListener('resize', size);
    document.addEventListener('visibilitychange', onVis);
    return () => { stop(); removeEventListener('resize', size); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop__field backdrop__field--a" />
        <div className="backdrop__field backdrop__field--b" />
        <div className="backdrop__stripes" />
        <div className="backdrop__dots" />
        <canvas className="backdrop__streaks" ref={canvas} />
        <div className="backdrop__scan" />
        <div className="backdrop__vignette" />
        <div className="backdrop__noise" />
      </div>
      <div className="hud" aria-hidden="true">
        <span className="hud__bar" />
        <div className="hud__rail">
          <span>VIZEDRAW <em>/</em> DWG.SYS</span>
          <span ref={readout}>SCROLL 000</span>
        </div>
      </div>
    </>
  );
}
