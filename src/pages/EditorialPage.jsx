import { useState } from 'react';
import PageHero from '../components/ui/PageHero.jsx';
import SectionIndex from '../components/ui/SectionIndex.jsx';
import Blocks from '../components/ui/Blocks.jsx';
import TextLink from '../components/ui/TextLink.jsx';
import Illustration from '../components/visuals/Illustration.jsx';
import Icon from '../components/ui/Icon.jsx';
import { slug } from '../content/site.js';

/** On the readiness checklist, plain bullet items become tickable checks (kept in memory only; no score is shown). */
function Checklist({ items, name }) {
  const [done, setDone] = useState(() => items.map(() => false));
  return (
    <ul className="checklist">
      {items.map((item, i) => (
        <li key={item}>
          <label className={done[i] ? 'is-done' : ''}>
            <input type="checkbox" checked={done[i]} onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))} aria-describedby={`${name}-h`} />
            <span className="checklist__box" aria-hidden="true"><Icon name="check" size={13} /></span>
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function EditorialPage({ page }) {
  const sections = page.sections.slice(1);
  const isChecklist = page.id === 13;
  return (
    <>
      <PageHero page={page} mode="editorial" />
      <section className="section section--after-hero">
        <div className="container article-grid">
          <div className="article-aside">
            <SectionIndex sections={sections} title="In this guide" numbered={false} />
            <div className="article-aside__note"><TextLink to="/product">See the VizeDraw workflow</TextLink></div>
          </div>
          <article className="article-body">
            {page.id === 18 && <Illustration variant="compare" title="A connected review, from Revision A to B" />}
            {sections.map((s) => {
              const sid = slug(s.heading);
              const checklistBlock = isChecklist && s.blocks.length === 1 && s.blocks[0].type === 'bullets' && typeof s.blocks[0].args[0][0] === 'string';
              return (
                <section key={s.heading} id={sid} className="article-section">
                  <h2 id={`${sid}-h`}>{s.heading}</h2>
                  {checklistBlock ? <Checklist items={s.blocks[0].args[0]} name={sid} /> : <Blocks blocks={s.blocks} />}
                </section>
              );
            })}
          </article>
        </div>
      </section>
    </>
  );
}
