import { Link } from 'react-router-dom';
import useSpotlight from '../../hooks/useSpotlight.js';

/** Glass card with a pointer-tracked light on its surface and edge. Renders a Link when `to` is set. */
export default function SpotlightCard({ to, as: Tag = 'article', className = '', children, ...rest }) {
  const onMove = useSpotlight();
  const cls = `glass spot ${className}`;
  if (to) return <Link to={to} className={cls} onPointerMove={onMove} {...rest}>{children}</Link>;
  return <Tag className={cls} onPointerMove={onMove} {...rest}>{children}</Tag>;
}
