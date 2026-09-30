import PAGES from './pages.json';

/** All 21 pages, verbatim from VizeDraw_Structure.html. */
export const pages = PAGES;

export const pageById = (id) => PAGES.find((p) => p.id === id);
export const pageByRoute = (route) => PAGES.find((p) => p.route === route);

/** Stable anchor ids for section headings (same slug rule as the reference renderer). */
export const slug = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Unconfigured destinations such as {{app.signup_url}} are shown in a "connect before launch" dialog. */
export const isPending = (route) => !route || route.includes('{{') || !route.startsWith('/');

const useCasePages = PAGES.filter((p) => p.id >= 4 && p.id <= 8).map((p) => [p.name, p.route]);

export const mainNav = [
  {
    label: 'Product',
    items: [
      ['Overview', '/product'],
      ['Features', '/features'],
      ['Enterprise & security', '/enterprise'],
      ['Drawing knowledge', '/drawing-knowledge'],
    ],
  },
  { label: 'Manufacturing', to: '/manufacturing' },
  { label: 'Use Cases', items: useCasePages },
  {
    label: 'Resources',
    items: [
      ['All resources', '/resources'],
      ['Readiness checklist', '/resources/drawing-readiness-checklist'],
      ['Revision control guide', '/resources/engineering-drawing-revision-control'],
      ['Worked review example', '/resources/drawing-review-example'],
    ],
  },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Company', to: '/company' },
];

export const footerNav = [
  ['Product', [['Overview', '/product'], ['Features', '/features'], ['Manufacturing', '/manufacturing'], ['Use cases', '/use-cases'], ['Pricing', '/pricing']]],
  ['Resources', [['All resources', '/resources'], ['Drawing knowledge', '/drawing-knowledge'], ['Revision control', '/resources/engineering-drawing-revision-control'], ['Worked example', '/resources/drawing-review-example']]],
  ['Company', [['About VizeDraw', '/company'], ['Enterprise', '/enterprise'], ['Contact & demo', '/contact']]],
];

export const SIGNUP = '{{app.signup_url}}';
export const SIGNIN = '{{app.signin_url}}';
