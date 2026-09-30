import { slug } from '../../content/site.js';
import useActiveSection from '../../hooks/useActiveSection.js';

/** Sticky "On this page" index. Numbers reflect reading order of the page's sections. */
export default function SectionIndex({ sections, title = 'On this page', numbered = true }) {
  const ids = sections.map((s) => slug(s.heading));
  const active = useActiveSection(ids);
  return (
    <aside className="section-index">
      <p className="kicker">{title}</p>
      <nav aria-label={title}>
        {sections.map((s, i) => (
          <a key={ids[i]} href={`#${ids[i]}`} className={active === ids[i] ? 'is-active' : ''}
            onClick={(e) => { e.preventDefault(); document.getElementById(ids[i])?.scrollIntoView({ block: 'start' }); }}>
            {numbered && <span className="section-index__num">{String(i + 1).padStart(2, '0')}</span>}
            <span>{s.heading}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
