/**
 * Illustrative technical drawing DEMO-104 (a cover plate), drawn in SVG so the site shows a drawing rather than an empty
 * image slot. Revision A → B widens the access cut-out (100 → 108) and rewrites note 3, matching the worked review
 * example. Replace with approved product screenshots before launch.
 */

// Revision cloud: arcs walked clockwise around a rectangle so every bump points outward.
function cloudPath(x, y, w, h, r = 7) {
  const seg = (len) => Math.max(2, Math.round(len / (r * 2)));
  const nx = seg(w), ny = seg(h);
  const sx = w / nx, sy = h / ny;
  let d = `M${x},${y}`;
  for (let i = 1; i <= nx; i++) d += ` A${sx / 2},${sx / 2} 0 0 1 ${x + sx * i},${y}`;
  for (let i = 1; i <= ny; i++) d += ` A${sy / 2},${sy / 2} 0 0 1 ${x + w},${y + sy * i}`;
  for (let i = 1; i <= nx; i++) d += ` A${sx / 2},${sx / 2} 0 0 1 ${x + w - sx * i},${y + h}`;
  for (let i = 1; i <= ny; i++) d += ` A${sy / 2},${sy / 2} 0 0 1 ${x},${y + h - sy * i}`;
  return d + 'Z';
}

const Arrow = ({ x, y, dir }) => {
  // small filled arrowhead for dimension lines
  const s = 6, w = 2.2;
  const pts = {
    right: `${x},${y} ${x - s},${y - w} ${x - s},${y + w}`,
    left: `${x},${y} ${x + s},${y - w} ${x + s},${y + w}`,
    up: `${x},${y} ${x - w},${y + s} ${x + w},${y + s}`,
    down: `${x},${y} ${x - w},${y - s} ${x + w},${y - s}`,
  }[dir];
  return <polygon points={pts} className="dw-arrowhead" />;
};

export default function DrawingSheet({ rev = 'B', showPin = true, showChanges = true, pinActive = false, className = '', title = 'Illustrative drawing DEMO-104' }) {
  const isB = rev === 'B';
  const changed = isB && showChanges;
  return (
    <svg className={`drawing ${changed ? 'drawing--changed' : ''} ${className}`} viewBox="0 0 560 360" role="img" aria-label={`${title}, revision ${rev}`}>
      {/* sheet frame */}
      <rect x="8" y="8" width="544" height="344" rx="3" className="dw-frame" />
      <rect x="18" y="18" width="524" height="324" className="dw-frame dw-frame--inner" />
      {/* zone ticks */}
      {[1, 2, 3, 4].map((i) => <line key={`t${i}`} x1={18 + i * 131} y1="8" x2={18 + i * 131} y2="18" className="dw-frame" />)}
      {[1, 2].map((i) => <line key={`s${i}`} x1="8" y1={18 + i * 108} x2="18" y2={18 + i * 108} className="dw-frame" />)}

      {/* centre lines */}
      <line x1="52" y1="160" x2="348" y2="160" className="dw-center" />
      <line x1="200" y1="58" x2="200" y2="266" className="dw-center" />

      {/* part outline — chamfered cover plate */}
      <path d="M84,70 H316 L330,84 V236 L316,250 H84 L70,236 V84 Z" className="dw-part" />
      {/* mounting holes */}
      {[[96, 96], [304, 96], [96, 224], [304, 224]].map(([cx, cy]) => (
        <g key={`${cx}${cy}`}>
          <circle cx={cx} cy={cy} r="7" className="dw-part" />
          <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} className="dw-center dw-center--short" />
          <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} className="dw-center dw-center--short" />
        </g>
      ))}
      {/* access cut-out: widens in revision B */}
      <rect x="150" y="122" width="100" height="76" rx="9" className="dw-part dw-cutout" style={{ transform: isB ? 'scaleX(1.08)' : 'scaleX(1)' }} />

      {/* side view (thickness) */}
      <rect x="364" y="70" width="14" height="180" className="dw-part" />
      <line x1="356" y1="160" x2="386" y2="160" className="dw-center dw-center--short" />

      {/* overall width dimension */}
      <line x1="70" y1="254" x2="70" y2="288" className="dw-dim" />
      <line x1="330" y1="254" x2="330" y2="288" className="dw-dim" />
      <line x1="76" y1="282" x2="324" y2="282" className="dw-dim" />
      <Arrow x={70} y={282} dir="left" /><Arrow x={330} y={282} dir="right" />
      <rect x="184" y="274" width="32" height="14" className="dw-mask" />
      <text x="200" y="285" className="dw-text" textAnchor="middle">260</text>

      {/* overall height dimension */}
      <line x1="66" y1="70" x2="34" y2="70" className="dw-dim" />
      <line x1="66" y1="250" x2="34" y2="250" className="dw-dim" />
      <line x1="40" y1="76" x2="40" y2="244" className="dw-dim" />
      <Arrow x={40} y={70} dir="up" /><Arrow x={40} y={250} dir="down" />
      <rect x="33" y="145" width="14" height="30" className="dw-mask" />
      <text x="44" y="160" className="dw-text" textAnchor="middle" transform="rotate(-90 44 160)">180</text>

      {/* cut-out width dimension — the changed value */}
      <g className="dw-change">
        <line x1={isB ? 146 : 150} y1="118" x2={isB ? 146 : 150} y2="40" className="dw-dim dw-dim--live" />
        <line x1={isB ? 254 : 250} y1="118" x2={isB ? 254 : 250} y2="40" className="dw-dim dw-dim--live" />
        <line x1={isB ? 152 : 156} y1="46" x2={isB ? 248 : 244} y2="46" className="dw-dim dw-dim--live" />
        <Arrow x={isB ? 146 : 150} y={46} dir="left" /><Arrow x={isB ? 254 : 250} y={46} dir="right" />
        <rect x="184" y="38" width="32" height="14" className="dw-mask" />
        <text x="200" y="49" className="dw-text dw-text--swap" textAnchor="middle">{isB ? '108' : '100'}</text>
        <path d={cloudPath(174, 30, 52, 26, 5)} className="dw-cloud" />
      </g>

      {/* leader to note 3 */}
      <polyline points="250,140 300,120 402,120" className="dw-dim" />
      <circle cx="250" cy="140" r="2" className="dw-dot" />

      {/* note 3 — rewritten in revision B */}
      <g className="dw-note">
        <text x="408" y="116" className="dw-text dw-text--label">NOTE 3</text>
        {isB ? (
          <>
            <text x="408" y="133" className="dw-text dw-text--note">COVER ACCESS FROM</text>
            <text x="408" y="147" className="dw-text dw-text--note">SERVICE SIDE.</text>
            <text x="408" y="161" className="dw-text dw-text--note">REF CHANGE-DEMO-07</text>
          </>
        ) : (
          <>
            <text x="408" y="133" className="dw-text dw-text--note">COVER ACCESS THIS</text>
            <text x="408" y="147" className="dw-text dw-text--note">SIDE ONLY.</text>
          </>
        )}
        <path d={cloudPath(398, 102, 144, 66, 6)} className="dw-cloud" />
        <g className="dw-delta">
          <polygon points="530,92 540,108 520,108" />
          <text x="530" y="106" textAnchor="middle">B</text>
        </g>
      </g>

      {/* review pin on note 3 */}
      {showPin && (
        <g className={`dw-pin ${pinActive ? 'is-active' : ''}`} transform="translate(402 186)">
          <circle r="13" className="dw-pin__ring" />
          <circle r="9" className="dw-pin__dot" />
          <text y="3.5" textAnchor="middle">1</text>
        </g>
      )}

      {/* title block */}
      <g className="dw-titleblock">
        <rect x="364" y="276" width="178" height="66" className="dw-frame" />
        <line x1="364" y1="298" x2="542" y2="298" className="dw-frame" />
        <line x1="364" y1="320" x2="542" y2="320" className="dw-frame" />
        <line x1="486" y1="276" x2="486" y2="342" className="dw-frame" />
        <text x="370" y="286" className="dw-tb-label">DWG NO</text>
        <text x="370" y="295" className="dw-tb-value">DEMO-104</text>
        <text x="492" y="286" className="dw-tb-label">REV</text>
        <text x="492" y="295" className="dw-tb-value dw-tb-rev">{rev}</text>
        <text x="370" y="308" className="dw-tb-label">TITLE</text>
        <text x="370" y="317" className="dw-tb-value">COVER PLATE, ACCESS</text>
        <text x="492" y="308" className="dw-tb-label">SCALE</text>
        <text x="492" y="317" className="dw-tb-value">1:2</text>
        <text x="370" y="330" className="dw-tb-label">UNITS</text>
        <text x="370" y="339" className="dw-tb-value">MM</text>
        <text x="492" y="330" className="dw-tb-label">SHEET</text>
        <text x="492" y="339" className="dw-tb-value">1 / 3</text>
      </g>
    </svg>
  );
}
