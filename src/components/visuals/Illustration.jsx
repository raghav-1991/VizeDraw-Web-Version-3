import DrawingSheet from './DrawingSheet.jsx';
import StackDiagram from './StackDiagram.jsx';

const ROLES = ['Engineering', 'Suppliers', 'Customers', 'Production', 'Quality'];

/**
 * Illustrative figures that stand in for the reference's image placeholders.
 * `title` is the placeholder title from the structure file; it becomes the caption.
 */
export default function Illustration({ variant = 'review', title }) {
  return (
    <figure className={`illus illus--${variant}`}>
      <div className="illus__frame">
        {variant === 'review' && (
          <>
            <div className="illus__sheet"><DrawingSheet rev="A" showChanges={false} /></div>
            <div className="thread thread--open thread--float">
              <span className="thread__pin">1</span>
              <div>
                <p className="thread__kind">Question on note 3</p>
                <p className="thread__text">Which side is intended by the cover-access note on this revision?</p>
              </div>
              <span className="status status--open">Awaiting clarification</span>
            </div>
          </>
        )}

        {variant === 'compare' && (
          <div className="illus__pair">
            <div className="illus__rev"><span className="chip chip--mono">REV A</span><DrawingSheet rev="A" showPin={false} showChanges={false} /></div>
            <div className="illus__rev illus__rev--b"><span className="chip chip--mono chip--brand">REV B</span><DrawingSheet rev="B" showPin={false} /></div>
          </div>
        )}

        {variant === 'handoff' && (
          <div className="illus__handoff">
            <div className="illus__sheet illus__sheet--small"><DrawingSheet rev="B" showChanges={false} /></div>
            <ul className="illus__roles">
              {ROLES.map((r, i) => <li key={r} style={{ '--i': i }}><span />{r}</li>)}
            </ul>
          </div>
        )}

        {variant === 'stack' && <div className="illus__stack"><StackDiagram /></div>}
      </div>
      <figcaption>
        <strong>{title}</strong>
        <span>Illustrative layout, not a product screenshot</span>
      </figcaption>
    </figure>
  );
}
