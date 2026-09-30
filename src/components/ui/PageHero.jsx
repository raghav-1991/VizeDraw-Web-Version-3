import Breadcrumb from './Breadcrumb.jsx';
import Blocks from './Blocks.jsx';

/**
 * Hero for every page except the homepage. First body block is the H1, remaining body blocks are the description,
 * other blocks (CTAs) follow — the same mapping as the reference renderer.
 * mode: 'split' (with visual) | 'center' | 'editorial'
 */
export default function PageHero({ page, mode = 'split', visual = null }) {
  const h = page.sections[0];
  const paras = h.blocks.filter((b) => b.type === 'body');
  const rest = h.blocks.filter((b) => b.type !== 'body');
  return (
    <section className={`page-hero page-hero--${mode}`}>
      <div className={`container ${visual ? 'page-hero__grid' : ''}`}>
        <div className="page-hero__copy">
          <Breadcrumb name={page.name} />
          <p className="kicker">{page.name}</p>
          <h1>{paras[0]?.args[0]}</h1>
          {paras.slice(1).map((b, i) => <p key={i} className="lede">{b.args[0]}</p>)}
          <Blocks blocks={rest} />
        </div>
        {visual && <div className="page-hero__visual">{visual}</div>}
      </div>
    </section>
  );
}
