import useReveal from '../../hooks/useReveal.js';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms`, ...rest.style }} {...rest}>
      {children}
    </Tag>
  );
}
