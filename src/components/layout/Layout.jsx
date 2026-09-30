import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import RetroField from '../visuals/RetroField.jsx';

/** Site frame: retro backdrop + HUD, skip link, header, routed page, footer. Handles scroll on route and anchor changes. */
export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);

  return (
    <>
      <RetroField />
      <a className="skip-link" href="#main-content" onClick={(e) => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1} key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
