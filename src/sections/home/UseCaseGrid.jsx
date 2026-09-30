import { useEffect, useRef, useState } from 'react';
import SpotlightCard from '../../components/ui/SpotlightCard.jsx';
import TextLink from '../../components/ui/TextLink.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Icon from '../../components/ui/Icon.jsx';
import Glitch from '../../components/ui/Glitch.jsx';

const ROUTES = ['/use-cases/engineering-drawing-review', '/use-cases/external-drawing-review', '/use-cases/drawing-revision-review', '/use-cases/production-quality-handoff'];
const TAGS = ['MARKUP.PIN', 'EXT.EXCHANGE', 'REV.DELTA', 'PROD.HANDOFF'];

// Small drafting glyphs: pinned markup, external exchange, revision delta, handoff.
const GLYPHS = [
  <g key="a"><rect x="5" y="7" width="26" height="20" rx="2" /><circle cx="23" cy="14" r="4" className="g-brand" /><path d="M9 21h10M9 17h7" /></g>,
  <g key="b"><rect x="3" y="9" width="14" height="18" rx="2" /><rect x="19" y="9" width="14" height="18" rx="2" /><path d="M13 5h10l-3-3M23 31H13l3 3" className="g-brand" /></g>,
  <g key="c"><rect x="4" y="6" width="22" height="24" rx="2" /><path d="M24 30l7-12 5 12z" className="g-brand" transform="translate(-4 -2)" /><path d="M8 13h12M8 18h8" /></g>,
  <g key="d"><rect x="3" y="10" width="13" height="16" rx="2" /><path d="M18 18h10" className="g-brand" /><path d="M25 14l4 4-4 4" className="g-brand" /><circle cx="33" cy="18" r="2" /></g>,
];

const PER_CARD = 0.6; // viewport heights of scrolling per card
const HOLD = 0.35; // share of each card's scroll segment it rests before the next one slides in
const EASE = 0.14; // how quickly the stack catches up with the scroll position
const pad = (n) => String(n).padStart(2, '0');
const smooth = (x) => x * x * (3 - 2 * x);
const canStack = () =>
  typeof window !== 'undefined' &&
  matchMedia('(min-width: 901px) and (hover: hover)').matches &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches;

function Head() {
  return (
    <div className="section-head">
      <div>
        <p className="kicker">Built for manufacturing handoffs</p>
        <h2><Glitch text="Different teams." delay={600} /><br />The same source of context.</h2>
      </div>
      <TextLink to="/use-cases">See all use cases</TextLink>
    </div>
  );
}

export default function UseCaseGrid({ section }) {
  const items = section.blocks[0].args[0];
  const [stacked] = useState(canStack);
  if (stacked) return <UseCaseStack items={items} />;
  return (
    <section className="section">
      <div className="container">
        <Head />
        <div className="usecase-grid">
          {items.map(([title, text], i) => (
            <Reveal key={title} delay={i * 70}>
              <SpotlightCard to={ROUTES[i]} className="usecase-card">
                <svg className="usecase-card__glyph" viewBox="0 0 36 36" aria-hidden="true">{GLYPHS[i]}</svg>
                <h3>{title}</h3>
                <p>{text.trim()}</p>
                <span className="usecase-card__link">Explore workflow <Icon name="arrow-up-right" size={16} /></span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Desktop version: the section pins while you scroll and each card slides up over the last one, which steps back,
 * dims and fades. A counter and progress track follow along. Focusing a card scrolls the page to it.
 */
function UseCaseStack({ items }) {
  const n = items.length;
  const root = useRef(null);
  const stage = useRef(null);
  const cells = useRef([]);
  const idx = useRef(null);
  const bar = useRef(null);

  const progress = () => {
    const el = root.current, range = el.offsetHeight - innerHeight;
    return range > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range)) : 0;
  };
  // scroll progress → stack position: each card rests, then the next one arrives on an eased move
  const position = (p) => {
    const k = p * n, i = Math.floor(k), f = k - i;
    if (i >= n - 1) return n - 1;
    return f <= HOLD ? i : i + smooth((f - HOLD) / (1 - HOLD));
  };

  useEffect(() => {
    let shown = progress(), raf = 0, cur = -1;
    const paint = (pos) => {
      const h = stage.current.clientHeight;
      cells.current.forEach((el, i) => {
        const d = pos - i;
        let y = 0, s = 1, back = 0;
        if (d < 0) y = Math.min(1, -d) * (h + 40);
        else { back = Math.min(1, d); s = 1 - 0.05 * back; y = -22 * back; }
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
        el.style.filter = back ? `saturate(${(1 - 0.4 * back).toFixed(3)}) blur(${(back * 2).toFixed(2)}px)` : '';
        el.style.opacity = back ? (1 - back * back).toFixed(3) : '';
      });
    };
    const tick = () => {
      raf = 0;
      const target = progress();
      shown += (target - shown) * EASE;
      if (Math.abs(target - shown) < 5e-4) shown = target;
      paint(position(shown));
      const c = Math.round(position(target));
      if (c !== cur) {
        cur = c;
        idx.current.textContent = pad(c + 1);
        cells.current.forEach((el, i) => el.classList.toggle('is-cur', i === c));
      }
      bar.current.style.transform = `scaleX(${target.toFixed(4)})`;
      if (shown !== target) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', kick); removeEventListener('resize', kick); };
  }, [n]);

  // keyboard users: tabbing into a card that is off-stage scrolls the page to where that card is resting
  const jump = (i) => {
    const el = root.current, range = el.offsetHeight - innerHeight;
    const top = el.getBoundingClientRect().top + scrollY + ((i + HOLD / 2) / n) * range;
    window.scrollTo({ top, behavior: 'instant' });
  };

  return (
    <section className="uc-stack" ref={root} style={{ height: `calc(100vh + ${n * PER_CARD * 100}vh)` }}>
      <div className="uc-stack__pin">
        <div className="container uc-stack__inner">
          <Head />
          <div className="uc-stack__hud" aria-hidden="true">
            <span><b ref={idx}>01</b> / {pad(n)}</span>
            <span className="uc-stack__track"><span ref={bar} /></span>
            <span>SCROLL.TO.ADVANCE ↓</span>
          </div>
          <div className="uc-stack__stage" ref={stage}>
            {items.map(([title, text], i) => (
              <div className="uc-stack__cell" key={title} ref={(el) => { cells.current[i] = el; }} style={{ zIndex: i + 1 }} onFocus={() => jump(i)}>
                <SpotlightCard to={ROUTES[i]} className="uc-slide">
                  <div className="uc-slide__copy">
                    <p className="uc-slide__no">UC.{pad(i + 1)} <em>/</em> {TAGS[i]}</p>
                    <h3>{title}</h3>
                    <p>{text.trim()}</p>
                    <span className="usecase-card__link">Explore workflow <Icon name="arrow-up-right" size={16} /></span>
                  </div>
                  <div className="uc-slide__vis" aria-hidden="true">
                    <svg className="uc-slide__glyph" viewBox="0 0 36 36">{GLYPHS[i]}</svg>
                    <span className="uc-slide__scan" />
                    <span className="uc-slide__corner">FIG.{pad(i + 1)}</span>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
