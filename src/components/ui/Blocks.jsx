import { Actions } from './Button.jsx';

/** Renders the content blocks from pages.json: body, cta, bullets, numbered, table. */
export default function Blocks({ blocks, skipCta = false }) {
  return blocks.map((b, i) => {
    const a = b.args;
    switch (b.type) {
      case 'body':
        return <p key={i}>{a[0]}</p>;
      case 'cta':
        return skipCta ? null : <Actions key={i} args={a} />;
      case 'bullets':
      case 'numbered': {
        const Tag = b.type === 'numbered' ? 'ol' : 'ul';
        return (
          <Tag key={i} className={`copy-list copy-list--${b.type}`}>
            {a[0].map((x, j) => (
              <li key={j}>
                {Array.isArray(x) ? (<><strong>{x[0].trim()}</strong><span>{x[1].trim()}</span></>) : x}
              </li>
            ))}
          </Tag>
        );
      }
      case 'table':
        return (
          <div key={i} className="table-wrap" tabIndex={0} role="region" aria-label="Scrollable comparison">
            <table>
              <thead><tr>{a[0].map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {a[1].map((row, r) => (
                  <tr key={r}>{row.map((v, c) => (c === 0 ? <th key={c} scope="row">{v}</th> : <td key={c}>{v}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  });
}
