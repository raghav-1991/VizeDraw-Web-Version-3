import Reveal from '../../components/ui/Reveal.jsx';
import TextLink from '../../components/ui/TextLink.jsx';
import StackDiagram from '../../components/visuals/StackDiagram.jsx';

export default function StackSection({ section }) {
  return (
    <section className="section stack-section">
      <div className="container split">
        <Reveal>
          <p className="kicker">A focused role in your stack</p>
          <h2>Fits around the systems<br />you already use.</h2>
          <p className="lede">{section.blocks[0].args[0]}</p>
          <TextLink to="/compare/pdm-vs-drawing-collaboration">PDM vs drawing collaboration</TextLink>
        </Reveal>
        <Reveal delay={120} className="glass stack-section__panel"><StackDiagram /></Reveal>
      </div>
    </section>
  );
}
