import { useEffect, useRef, useState } from 'react';
import DrawingSheet from './DrawingSheet.jsx';
import Icon from '../ui/Icon.jsx';

const THREAD = {
  A: {
    kind: 'Supplier question',
    text: 'Which side is intended by the cover-access note on this revision?',
    meta: 'Responsible reviewer: the assigned design-review owner.',
    status: 'Awaiting clarification',
    tone: 'open',
  },
  B: {
    kind: 'Recorded response',
    text: 'Explanation recorded in CHANGE-DEMO-07. The drawing note is updated in Revision B.',
    meta: 'Manufacturing release: still determined by the organization’s authorized process.',
    status: 'Clarified',
    tone: 'done',
  },
};

const TRAIL = ['Source', 'Revision', 'Response', 'Next action'];

/**
 * The homepage's interactive moment: an illustrative review workspace. Visitors flip Revision A ↔ B and watch the
 * changed dimension, the revised note and the review thread update together. It flips to B once on its own after load.
 */
export default function DrawingViewer() {
  const [rev, setRev] = useState('A');
  const touched = useRef(false);
  const frame = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setRev('B'); return; }
    const t = setTimeout(() => { if (!touched.current) setRev('B'); }, 2600);
    return () => clearTimeout(t);
  }, []);

  const choose = (r) => { touched.current = true; setRev(r); };
  const t = THREAD[rev];
  const trailDone = rev === 'B' ? 3 : 2;

  // subtle pointer-follow light across the glass frame
  const onMove = (e) => {
    const r = frame.current.getBoundingClientRect();
    frame.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    frame.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <figure className="viewer" aria-label="Illustrative review workspace">
      <div className="viewer__frame" ref={frame} onPointerMove={onMove}>
        {/* intro: the frame's border is traced in, then the panel blinks twice */}
        <svg className="draw-rule" aria-hidden="true"><rect width="100%" height="100%" rx="21" pathLength="1" /></svg>
        <span className="draw-flash" aria-hidden="true" />
        <div className="viewer__bar">
          <span className="viewer__brand">
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M4.5 5L10 15L15.5 5" fill="none" stroke="#4ebabd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            VizeDraw
          </span>
          <span className="viewer__label">Illustrative review workspace</span>
          <div className="seg" role="radiogroup" aria-label="Revision shown">
            <span className="seg__thumb" style={{ transform: rev === 'B' ? 'translateX(100%)' : 'none' }} aria-hidden="true" />
            {['A', 'B'].map((r) => (
              <button key={r} type="button" role="radio" aria-checked={rev === r} className={rev === r ? 'is-on' : ''} onClick={() => choose(r)}>
                Rev {r}
              </button>
            ))}
          </div>
        </div>

        <div className="viewer__body">
          <aside className="viewer__side">
            <p className="viewer__side-title">Drawing set</p>
            <button type="button" className={`sheet-item ${rev === 'B' ? 'is-on' : ''}`} onClick={() => choose('B')}>
              <span>DEMO–104</span><small>Revision B</small>
            </button>
            <button type="button" className={`sheet-item ${rev === 'A' ? 'is-on' : ''}`} onClick={() => choose('A')}>
              <span>Review history</span><small>Revision A</small>
            </button>
            <div className="sheet-item sheet-item--static"><span>Questions</span><small>Review context</small></div>
            <ol className="trail" aria-label="Review trail">
              {TRAIL.map((s, i) => (
                <li key={s} className={i <= trailDone ? 'is-done' : ''}>
                  <span className="trail__tick">{i <= trailDone && <Icon name="check" size={11} />}</span>{s}
                </li>
              ))}
            </ol>
          </aside>

          <div className="viewer__canvas">
            <div className="viewer__canvas-top">
              <span>Drawing review</span>
              <span className="chip chip--mono">REV {rev}</span>
            </div>
            <div className="viewer__sheet">
              <DrawingSheet rev={rev} pinActive />
            </div>
            <div className={`thread thread--${t.tone}`} aria-live="polite">
              <span className="thread__pin">1</span>
              <div>
                <p className="thread__kind">{t.kind}</p>
                <p className="thread__text">{t.text}</p>
                <p className="thread__meta">{t.meta}</p>
              </div>
              <span className={`status status--${t.tone}`}>{t.status}</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="viewer__foot">
        <span><strong>One source for the conversation.</strong> Drawing, revision, question and recorded response.</span>
        <span>Illustrative layout, not a product screenshot</span>
      </figcaption>
    </figure>
  );
}
