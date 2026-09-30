import { useId, useState } from 'react';
import Icon from './Icon.jsx';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  const base = useId();
  return (
    <div className="accordion">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={q}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{q}</span>
                <span className="accordion__icon"><Icon name="plus" /></span>
              </button>
            </h3>
            <div className="accordion__panel" id={id} role="region" aria-hidden={!isOpen}>
              <div><p>{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
