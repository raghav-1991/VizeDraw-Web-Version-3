import { Actions } from '../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <section className="page-hero page-hero--center not-found">
      <div className="container">
        <p className="kicker">404</p>
        <h1>This page is not available.</h1>
        <p className="lede">The link may have changed. Return to the product overview or explore the manufacturing drawing workflows.</p>
        <Actions args={['Product overview', '/product', ['Manufacturing workflows', '/manufacturing']]} />
      </div>
    </section>
  );
}
