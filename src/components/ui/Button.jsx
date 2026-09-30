import SmartLink from './SmartLink.jsx';
import useSpotlight from '../../hooks/useSpotlight.js';

/** Primary buttons carry a light sweep and a pointer-tracked glow; secondary buttons are glass. */
export default function Button({ to, variant = 'primary', size, children, className = '' }) {
  const onMove = useSpotlight();
  return (
    <SmartLink to={to} className={`btn btn--${variant} ${size ? `btn--${size}` : ''} ${className}`} onPointerMove={onMove}>
      <span>{children}</span>
    </SmartLink>
  );
}

/** Renders a `cta` block: [label, route, [secondaryLabel, secondaryRoute]?] */
export function Actions({ args, className = '' }) {
  const [label, route, secondary] = args;
  return (
    <div className={`actions ${className}`}>
      <Button to={route}>{label}</Button>
      {secondary && <Button to={secondary[1]} variant="secondary">{secondary[0]}</Button>}
    </div>
  );
}
