/** CAD / PDM / PLM / QMS / Production stay authoritative; VizeDraw is the review layer beside them. */
export default function StackDiagram() {
  return (
    <div className="stack" role="img" aria-label="CAD, PDM, PLM, QMS and production systems remain authoritative; VizeDraw supports the drawing review layer.">
      <div className="stack__systems">
        {['CAD', 'PDM', 'PLM', 'QMS', 'Production'].map((x) => <span key={x}>{x}</span>)}
      </div>
      <svg className="stack__links" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
        {[40, 120, 200, 280, 360].map((x) => <path key={x} d={`M${x},0 C${x},32 200,28 200,60`} />)}
      </svg>
      <div className="stack__core">
        <p className="kicker">VizeDraw</p>
        <strong>The drawing review layer</strong>
        <div className="stack__chips">
          {['Questions', 'Markups', 'Responses', 'Decisions'].map((x) => <span key={x}>{x}</span>)}
        </div>
      </div>
      <p className="stack__note">Keep your authoring, record and release systems.</p>
    </div>
  );
}
