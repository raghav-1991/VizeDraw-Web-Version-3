import PageHero from '../components/ui/PageHero.jsx';
import SpotlightCard from '../components/ui/SpotlightCard.jsx';
import Blocks from '../components/ui/Blocks.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';

export default function UseCasesPage({ page }) {
  const cases = page.sections.slice(1, 5);
  const note = page.sections[5];
  return (
    <>
      <PageHero page={page} mode="center" />
      <section className="section section--tight-top">
        <div className="container">
          <div className="usecase-grid usecase-grid--large">
            {cases.map((s, i) => (
              <Reveal key={s.heading} delay={i * 70}>
                <SpotlightCard className="usecase-card usecase-card--large">
                  <h2>{s.heading}</h2>
                  <Blocks blocks={s.blocks} />
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="evaluation-note">
            <p className="kicker">Start small</p>
            <h2>{note.heading}</h2>
            <Blocks blocks={note.blocks} />
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
