import Reveal from '../../components/ui/Reveal.jsx';
import TextLink from '../../components/ui/TextLink.jsx';

// Where each piece of context lives today — taken from the problem statement's first paragraph.
const FRAGMENTS = [
  ['Folder', 'The drawing'],
  ['Email', 'The reason for the change'],
  ['Chat', 'A supplier’s question'],
  ['Someone’s memory', 'The approved answer'],
];

export default function ProblemSection({ section }) {
  const [p1, , p3] = section.blocks;
  return (
    <section className="section problem">
      <div className="container problem__layout">
        <Reveal>
          <p className="kicker">The drawing knowledge gap</p>
          <h2>The file is available.<br /><span className="h-soft">The context is not.</span></h2>
          <ul className="fragments" aria-label="Where drawing context is scattered today">
            {FRAGMENTS.map(([where, what], i) => (
              <li key={where} style={{ '--i': i }}>
                <span className="fragments__where">{where}</span>
                <span className="fragments__what">{what}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="prose problem__prose" delay={120}>
          <p>{p1.args[0]}</p>
          <p>{p3.args[0]}</p>
          <TextLink to="/drawing-knowledge">Explore drawing knowledge</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
