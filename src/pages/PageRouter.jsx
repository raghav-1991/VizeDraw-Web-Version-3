import { useLocation } from 'react-router-dom';
import { pageByRoute } from '../content/site.js';
import HomePage from './HomePage.jsx';
import GenericPage from './GenericPage.jsx';
import EditorialPage from './EditorialPage.jsx';
import UseCasesPage from './UseCasesPage.jsx';
import ResourcesPage from './ResourcesPage.jsx';
import PricingPage from './PricingPage.jsx';
import ContactPage from './ContactPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import usePageMeta from '../hooks/usePageMeta.js';

const EDITORIAL = [13, 14, 15, 16, 17, 18];

/** Picks the template for a page, mirroring the reference renderer's page → layout mapping. */
export default function PageRouter() {
  const { pathname } = useLocation();
  const route = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  const page = pageByRoute(route);
  usePageMeta(page);

  if (!page) return <NotFoundPage />;
  if (page.id === 1) return <HomePage page={page} />;
  if (page.id === 4) return <UseCasesPage page={page} />;
  if (page.id === 12) return <ResourcesPage page={page} />;
  if (page.id === 19) return <PricingPage page={page} />;
  if (page.id === 21) return <ContactPage page={page} />;
  if (EDITORIAL.includes(page.id)) return <EditorialPage page={page} />;
  return <GenericPage page={page} />;
}
