import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { footerNav } from '../../content/site.js';
import { useDialogs } from '../../context/DialogContext.jsx';

export default function Footer() {
  const { openSitemap, openHandoff } = useDialogs();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo />
          <p>Keep the knowledge behind every drawing connected from design to execution.</p>
          <p className="site-footer__maker">A Zenitude product</p>
        </div>
        {footerNav.map(([heading, links]) => (
          <div key={heading} className="site-footer__col">
            <h2>{heading}</h2>
            {links.map(([label, route]) => <Link key={route} to={route}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} Zenitude. All rights reserved.</span>
        <div className="site-footer__legal">
          <SmartLink to="{{legal.privacy_url}}">Privacy Notice</SmartLink>
          <SmartLink to="{{legal.terms_url}}">Terms of Use</SmartLink>
          <SmartLink to="{{consent.open_preferences}}">Cookie Preferences</SmartLink>
        </div>
        <div className="site-footer__legal">
          <button type="button" onClick={openSitemap}>Explore all 21 pages</button>
          <button type="button" onClick={openHandoff}>Development notes</button>
        </div>
      </div>
      <div className="site-footer__wordmark" aria-hidden="true">VizeDraw</div>
    </footer>
  );
}
