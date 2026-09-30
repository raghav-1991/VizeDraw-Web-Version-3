import Accordion from '../../components/ui/Accordion.jsx';

export default function FaqSection({ section }) {
  const q = section.blocks.filter((b) => b.type === 'body').map((b) => b.args[0]);
  const items = [];
  for (let i = 0; i < q.length; i += 2) items.push([q[i], q[i + 1]]);
  return (
    <section className="section faq">
      <div className="container faq__layout">
        <div>
          <p className="kicker">A few things worth knowing</p>
          <h2>Clear answers.<br />Before you begin.</h2>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
