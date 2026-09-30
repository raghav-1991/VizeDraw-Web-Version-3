import { Link } from 'react-router-dom';
import { isPending } from '../../content/site.js';
import { useDialogs } from '../../context/DialogContext.jsx';

/**
 * One link primitive for the whole site.
 * Internal routes → router links (anchors like /contact#demo are honoured by the Layout scroll handler).
 * Unconfigured destinations ({{app.signup_url}}, checkout, legal) → a button that explains what must be connected.
 */
export default function SmartLink({ to, className = '', children, onClick, ...rest }) {
  const { openPending } = useDialogs();
  if (isPending(to)) {
    return (
      <button type="button" className={className} onClick={(e) => { onClick?.(e); openPending(to); }} {...rest}>
        {children}
      </button>
    );
  }
  return <Link to={to} className={className} onClick={onClick} {...rest}>{children}</Link>;
}
