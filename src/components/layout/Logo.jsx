import { Link } from 'react-router-dom';

/** Concept wordmark (replace with the approved VizeDraw logo). The mark is a V drawn as a dimensioned line. */
export default function Logo() {
  return (
    <Link to="/" className="brand" aria-label="VizeDraw home">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
          <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" style={{ stroke: 'var(--line-strong)' }} />
          <path d="M8.5 9.5L16 23.5L23.5 9.5" stroke="#4ebabd" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="23.5" r="1.6" style={{ fill: 'var(--ice)' }} />
        </svg>
      </span>
      <span className="brand__word">Vize<span>Draw</span></span>
    </Link>
  );
}
