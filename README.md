# VizeDraw website (React)

Dark glassmorphic marketing site for VizeDraw, built with React 18 + Vite. All 21 pages, their section order and copy come from `VizeDraw_Structure.html` and live unchanged in `src/content/pages.json`.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
SINGLE=1 npm run build   # one self-contained HTML file → dist-single/ (used for the hosted preview)
```

Routing uses `HashRouter`, so the build works on any static host with no rewrite rules. To switch to clean URLs, replace `HashRouter` with `BrowserRouter` in `src/main.jsx` and add an SPA fallback on the host.

## Structure

```
src/
  content/        pages.json (verbatim content), site.js (nav, footer, helpers)
  context/        DialogContext – site map, "connect before launch", development notes dialogs
  hooks/          useReveal, useSpotlight, useActiveSection, usePageMeta
  components/
    layout/       Layout, Header (glass nav + mobile sheet), Footer, Logo
    ui/           Button/Actions, SmartLink, TextLink, Blocks (renders content blocks),
                  SpotlightCard, Accordion, SectionIndex, PageHero, CtaBand, Reveal, Icon
    visuals/      DrawingSheet (SVG drawing DEMO-104, Rev A/B), DrawingViewer (interactive hero),
                  Illustration (figure variants), StackDiagram
  sections/home/  Homepage sections
  pages/          PageRouter + templates: Home, Generic, Editorial, UseCases, Resources, Pricing, Contact, 404
  styles/         tokens.css (change first), base.css, components.css, pages.css
```

`PageRouter` maps page ids to templates exactly as the reference renderer did (home, use-case hub, resources, pricing, contact, editorial guides 13–18, generic for the rest).

## Design notes

- Brand `#4ebabd` on a cool black base; glass = gradient fill + hairline border + 20px backdrop blur. All values are tokens in `styles/tokens.css`.
- Type: Schibsted Grotesk throughout; IBM Plex Mono only for drawing annotations (drawing numbers, revisions, dimensions). Fonts are self-hosted via Fontsource.
- Interactions: Rev A/B flip in the hero viewer (auto-flips once), pointer-tracked spotlight on cards and primary buttons, sliding segmented controls, animated accordion and nav, sticky section index with active tracking, tickable readiness checklist (no score, per the checklist's own guidance), client-side form validation using the utility-state copy.
- Motion respects `prefers-reduced-motion`; content on screen at load is visible before first paint.

## Before launch (from the development notes)

- Replace the concept wordmark with the approved logo.
- The illustrative SVG drawings stand in for image placeholders; replace them with approved product screenshots or photography where required.
- Every `{{…}}` destination (signup, sign-in, checkout, legal, cookie preferences) opens a "Connect this before launch" dialog. Wire real values in `src/content/site.js` / `pages.json`.
- Connect the contact form to a secure backend (`src/pages/ContactPage.jsx`); it currently validates and shows a preview message only.
- Remove the site-map / development-notes footer buttons and the `noindex` meta tag.
