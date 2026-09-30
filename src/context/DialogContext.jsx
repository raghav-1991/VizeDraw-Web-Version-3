import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pages } from '../content/site.js';
import Icon from '../components/ui/Icon.jsx';

const DialogContext = createContext(null);
export const useDialogs = () => useContext(DialogContext);

/** Native <dialog> wrapper with open/close animation, backdrop click and Escape handled by the browser. */
function Modal({ open, onClose, labelledBy, wide, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? 'modal--wide' : ''}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        const r = e.currentTarget.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose();
      }}
    >
      {children}
    </dialog>
  );
}

function CloseButton({ onClick, label = 'Close' }) {
  return (
    <button type="button" className="modal__close" onClick={onClick} aria-label={label}>
      <Icon name="close" />
    </button>
  );
}

export function DialogProvider({ children }) {
  const [which, setWhich] = useState(null);
  const [pendingKey, setPendingKey] = useState('');
  const { pathname } = useLocation();
  const close = useCallback(() => setWhich(null), []);
  const openPending = useCallback((key) => { setPendingKey(key); setWhich('pending'); }, []);
  const openSitemap = useCallback(() => setWhich('sitemap'), []);
  const openHandoff = useCallback(() => setWhich('handoff'), []);

  useEffect(() => { setWhich(null); }, [pathname]);

  return (
    <DialogContext.Provider value={{ openPending, openSitemap, openHandoff }}>
      {children}

      <Modal open={which === 'sitemap'} onClose={close} labelledBy="sitemap-title" wide>
        <div className="modal__head">
          <div>
            <p className="kicker">Design reference</p>
            <h2 id="sitemap-title">Explore the website.</h2>
          </div>
          <CloseButton onClick={close} label="Close page directory" />
        </div>
        <p>21 pages. Shared components. One connected experience.</p>
        <div className="sitemap">
          {pages.map((p) => (
            <Link key={p.id} to={p.route} className="sitemap__item" aria-current={pathname === p.route ? 'page' : undefined}>
              <span className="sitemap__num">{String(p.id).padStart(2, '0')}</span>
              <span className="sitemap__text"><strong>{p.name}</strong><small>{p.route}</small></span>
              <Icon name="arrow-up-right" />
            </Link>
          ))}
        </div>
      </Modal>

      <Modal open={which === 'pending'} onClose={close} labelledBy="pending-title">
        <div className="modal__head">
          <h2 id="pending-title">Connect this before launch.</h2>
          <CloseButton onClick={close} />
        </div>
        <p>This is a design reference. This action needs an approved application, checkout or legal destination.</p>
        <code className="modal__code">{pendingKey}</code>
        <p>No account has been created and no transaction has taken place.</p>
        <button type="button" className="btn btn--primary" onClick={close}><span>Back to the reference</span></button>
      </Modal>

      <Modal open={which === 'handoff'} onClose={close} labelledBy="handoff-title" wide>
        <div className="modal__head">
          <h2 id="handoff-title">Development notes</h2>
          <CloseButton onClick={close} label="Close development notes" />
        </div>
        <p>This is a high-fidelity wireframe, not a production application.</p>
        <ul className="copy-list">
          <li>Replace the concept wordmark with the approved VizeDraw logo.</li>
          <li>Replace every labelled image placeholder with an approved product screenshot or photograph.</li>
          <li>Verify plan capabilities, prices, limits, app links and commercial claims.</li>
          <li>Connect the form to a secure backend and add approved legal pages.</li>
          <li>Remove reference chrome, noindex directives and demo states before launch.</li>
          <li>Use README.md and ASSET_BRIEF.md in the code package for the complete handoff.</li>
        </ul>
      </Modal>
    </DialogContext.Provider>
  );
}
