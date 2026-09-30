import Reveal from '../../components/ui/Reveal.jsx';
import TextLink from '../../components/ui/TextLink.jsx';

/** The four steps are a real sequence, so they are numbered and joined by a line that draws in once. */
export default function WorkflowSection({ section }) {
  const steps = section.blocks[0].args[0];
  return (
    <section className="section workflow" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="kicker">How VizeDraw works</p>
            <h2>From a drawing to<br />a decision you can find.</h2>
          </div>
          <TextLink to="/product">Explore the product</TextLink>
        </div>
        <Reveal className="workflow__slab glass">
          <ol className="workflow__steps">
            {steps.map(([title, text], i) => (
              <li key={title} className="workflow__step" style={{ '--i': i }}>
                <span className="workflow__node" aria-hidden="true"><span>{String(i + 1).padStart(2, '0')}</span></span>
                <h3>{title.trim()}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
