import { useRef } from 'react';
import { Actions } from '../../components/ui/Button.jsx';
import Icon from '../../components/ui/Icon.jsx';
import DrawingViewer from '../../components/visuals/DrawingViewer.jsx';
import Glitch from '../../components/ui/Glitch.jsx';
import ScrambleWords from '../../components/ui/ScrambleWords.jsx';

const LINE_1 = 'Every drawing carries decisions.';
const WORDS = ['connected.', 'traceable.', 'in context.', 'on record.'];

export default function HomeHero({ section }) {
  const ref = useRef(null);
  const description = section.blocks.filter((b) => b.type === 'body')[1].args[0];
  const cta = section.blocks.find((b) => b.type === 'cta');
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--hx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--hy', `${e.clientY - r.top}px`);
  };
  return (
    <section className="home-hero" ref={ref} onPointerMove={onMove}>
      <div className="home-hero__grid-light" aria-hidden="true" />
      <div className="container home-hero__layout">
        <div className="home-hero__copy">
          <p className="kicker kicker--pill kicker--hud"><span className="kicker__dot" />VD.SYS <em>//</em> Drawing Intelligence Workspace</p>
          <h1>
            <span className="visually-hidden">{LINE_1} Keep them {WORDS[0]}</span>
            <span className="home-hero__line" aria-hidden="true">
              <Glitch text={LINE_1} delay={1500}><span className="home-hero__ink">{LINE_1}</span></Glitch>
            </span>
            <span className="home-hero__line home-hero__line--outline" aria-hidden="true">
              Keep them <ScrambleWords words={WORDS} className="home-hero__word" />
            </span>
          </h1>
          <p className="lede">{description}</p>
          <Actions args={cta.args} />
          <ul className="hero-tags">
            {['PDF drawing review', 'Revision context', 'Connected decisions'].map((t) => (
              <li key={t}><Icon name="check" size={14} />{t}</li>
            ))}
          </ul>
          <p className="hero-meta" aria-hidden="true">
            <span className="hero-meta__live" />NOW.ONLINE <em>/</em> REV A → B <em>/</em> PDF.READY<span className="hero-meta__caret" />
          </p>
        </div>
        <DrawingViewer />
      </div>
    </section>
  );
}
