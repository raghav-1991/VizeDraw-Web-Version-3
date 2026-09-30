import PageHero from '../components/ui/PageHero.jsx';
import SpotlightCard from '../components/ui/SpotlightCard.jsx';
import Blocks from '../components/ui/Blocks.jsx';
import Icon from '../components/ui/Icon.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { pageById } from '../content/site.js';

const TARGET = [13, 14, 15, 16, 17, 18];
const TYPE = ['Checklist', 'Guide', 'Guide', 'Perspective', 'Comparison', 'Worked example'];
const COVER = [['Ready for', 'what’s next?'], ['The right', 'revision.'], ['A clearer', 'handoff.'], ['AI, with', 'judgement.'], ['Different roles.', 'Connected work.'], ['One question.', 'A connected answer.']];

export default function ResourcesPage({ page }) {
  let n = -1;
  return (
    <>
      <PageHero page={page} mode="center" />
      <section className="section section--tight-top">
        <div className="container">
          {page.sections.slice(1).map((s) => {
            const items = s.blocks.filter((b) => b.type === 'bullets').flatMap((b) => b.args[0]);
            const rest = s.blocks.filter((b) => b.type !== 'bullets');
            return (
              <div key={s.heading} className="resource-group">
                <h2 className="resource-group__title">{s.heading}</h2>
                <div className="resource-grid">
                  {items.map(([title, text]) => {
                    n += 1;
                    const i = n;
                    return (
                      <Reveal key={title} delay={(i % 3) * 70}>
                        <SpotlightCard to={pageById(TARGET[i]).route} className="resource-card">
                          <div className={`resource-card__cover resource-card__cover--${i % 3}`}>
                            <span className="resource-card__type">{TYPE[i]}</span>
                            <strong>{COVER[i][0]}<br />{COVER[i][1]}</strong>
                          </div>
                          <div className="resource-card__copy">
                            <h3>{title}</h3>
                            <p>{text.trim()}</p>
                            <span className="usecase-card__link">Read resource <Icon name="arrow-up-right" size={16} /></span>
                          </div>
                        </SpotlightCard>
                      </Reveal>
                    );
                  })}
                </div>
                {rest.length > 0 && <div className="resource-group__actions"><Blocks blocks={rest} /></div>}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
