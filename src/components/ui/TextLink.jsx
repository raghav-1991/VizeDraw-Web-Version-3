import SmartLink from './SmartLink.jsx';
import Icon from './Icon.jsx';

export default function TextLink({ to, children, className = '' }) {
  return (
    <SmartLink to={to} className={`text-link ${className}`}>
      <span>{children}</span>
      <Icon name="arrow-up-right" size={16} />
    </SmartLink>
  );
}
