import PageHero from '../components/ui/PageHero.jsx';
import SectionIndex from '../components/ui/SectionIndex.jsx';
import Blocks from '../components/ui/Blocks.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Illustration from '../components/visuals/Illustration.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { slug } from '../content/site.js';

// Hero figure per page: replaces the reference's image placeholders with illustrative drawings.
const HERO_VISUAL = {
  2: ['review', 'The review, beside its source'],
  3: ['handoff', 'Where engineering meets manufacturing'],
  5: ['review', 'The review, beside its source'],
  6: ['compare', 'Compare revisions in context'],
  7: ['handoff', 'The review, beside its source'],
  8: ['handoff', 'The review, beside its source'],
  9: ['compare', 'The review, beside its source'],
  10: ['stack', 'The review, beside its source'],
  11: ['review', 'The review, beside its source'],
  20: ['stack', 'A focused role in the engineering stack'],
};

const isCallout = (heading) => /boundary|boundaries|limitation|availability/.test(heading.toLowerCase());

/** Product, manufacturing, use-case detail, features, enterprise, drawing knowledge and company pages. */
export default function GenericPage({ page }) {
  const sections = page.sections.slice(1);
  const [variant, title] = HERO_VISUAL[page.id] || ['review', 'The review, beside its source'];
  return (
    <>
      <PageHero page={page} mode="split" visual={<Illustration variant={variant} title={title} />} />
      <section className="section section--after-hero">
        <div className="container feature-layout">
          <SectionIndex sections={sections} />
          <div className="feature-content">
            {sections.map((s, i) => (
              <Reveal as="section" key={s.heading} id={slug(s.heading)} className={`content-section ${isCallout(s.heading) ? 'content-section--callout glass' : ''}`}>
                <div className="content-section__rail" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                <div className="content-section__body">
                  <h2>{s.heading}</h2>
                  <Blocks blocks={s.blocks} />
                  {page.id === 2 && i === 1 && <Illustration variant="review" title="Pinned feedback and the recorded response" />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
