import { Actions } from './Button.jsx';
import Reveal from './Reveal.jsx';
import { SIGNUP } from '../../content/site.js';

export default function CtaBand({
  heading = 'Start with the drawing that needs an answer.',
  description = 'Bring in the person who needs to review it. Keep the question, response and next action in context.',
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <Reveal className="cta-band__panel">
          <div className="cta-band__grid" aria-hidden="true" />
          <div className="cta-band__copy">
            <p className="kicker">Your next drawing review</p>
            <h2>{heading}</h2>
            <p>{description}</p>
          </div>
          <Actions className="cta-band__actions" args={['Start a drawing review free', SIGNUP, ['Request a workflow demo', '/contact#demo']]} />
        </Reveal>
      </div>
    </section>
  );
}
