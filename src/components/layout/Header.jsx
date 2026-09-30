import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { mainNav, SIGNIN, SIGNUP } from '../../content/site.js';

function Dropdown({ item, open, onToggle, onHover, pathname }) {
  const active = item.items.some(([, r]) => r === pathname);
  const panelId = `menu-${item.label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div className={`nav-drop ${open ? 'is-open' : ''}`} onMouseEnter={() => onHover(item.label)} onMouseLeave={() => onHover(null)}>
      <button type="button" className={`nav-link ${active ? 'is-active' : ''}`} aria-expanded={open} aria-controls={panelId} onClick={() => onToggle(item.label)}>
        {item.label}
        <Icon name="chevron" size={14} className="nav-drop__chev" />
      </button>
      <div className="nav-drop__panel" id={panelId}>
        <div className="nav-drop__inner">
          {item.items.map(([label, route]) => (
            <NavLink key={route} to={route} end className="nav-drop__link">{label}</NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);
  const hoverCapable = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (min-width: 951px)').matches;

  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onDoc = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null); };
    const onKey = (e) => { if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false); } };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; }, [mobileOpen]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'is-menu-open' : ''}`}>
      <div className="container site-header__inner" ref={navRef}>
        <Logo />
        <button type="button" className="menu-toggle" aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={() => setMobileOpen((v) => !v)}>
          <span>{mobileOpen ? 'Close' : 'Menu'}</span>
          <Icon name={mobileOpen ? 'close' : 'menu'} />
        </button>
        <nav id="main-navigation" className="main-nav" aria-label="Main navigation">
          {mainNav.map((item) =>
            item.items ? (
              <Dropdown key={item.label} item={item} pathname={pathname} open={openMenu === item.label}
                onToggle={(l) => setOpenMenu((cur) => (cur === l ? null : l))}
                onHover={(l) => hoverCapable && setOpenMenu(l)} />
            ) : (
              <NavLink key={item.label} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>{item.label}</NavLink>
            )
          )}
          <div className="main-nav__mobile-actions">
            <SmartLink to={SIGNIN} className="nav-link">Sign in</SmartLink>
            <Button to={SIGNUP}>Start free</Button>
          </div>
        </nav>
        <div className="site-header__actions">
          <SmartLink to={SIGNIN} className="nav-link">Sign in</SmartLink>
          <Button to={SIGNUP} size="small">Start free</Button>
        </div>
      </div>
    </header>
  );
}
