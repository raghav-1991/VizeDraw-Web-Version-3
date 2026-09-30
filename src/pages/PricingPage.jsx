import { useState } from 'react';
import PageHero from '../components/ui/PageHero.jsx';
import Blocks from '../components/ui/Blocks.jsx';
import Button from '../components/ui/Button.jsx';
import SpotlightCard from '../components/ui/SpotlightCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';

const PLANS = ['Free', 'Starter', 'Pro', 'Enterprise'];

const APPROVAL = {
  Free: 'Allowances require approved catalog values.',
  Enterprise: 'Scope and commitments agreed in writing.',
};

/** Selectors demonstrate layout only — they never calculate or quote a price. */
export default function PricingPage({ page }) {
  const [plan, setPlan] = useState('Individual');
  const [currency, setCurrency] = useState('USD');

  return (
    <>
      <PageHero page={page} mode="center" />
      <section className="section section--tight-top">
        <div className="container">
          <div className="pricing-controls">
            <div className="seg seg--large" role="radiogroup" aria-label="Plan type">
              <span className="seg__thumb" style={{ transform: plan === 'Team' ? 'translateX(100%)' : 'none' }} aria-hidden="true" />
              {['Individual', 'Team'].map((p) => (
                <button key={p} type="button" role="radio" aria-checked={plan === p} className={plan === p ? 'is-on' : ''} onClick={() => setPlan(p)}>{p}</button>
              ))}
            </div>
            <label className="select-field">
              <span>Currency</span>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">Global USD</option>
                <option value="INR">India INR</option>
              </select>
            </label>
            <span className="pricing-controls__note">Paid subscriptions billed annually</span>
          </div>

          <div className="pricing-grid">
            {PLANS.map((name, i) => {
              const s = page.sections.find((x) => x.heading === name);
              const desc = s.blocks.find((b) => b.type === 'body' && b.args[0].startsWith('For '));
              const action = s.blocks.find((b) => b.type === 'cta');
              const isPro = name === 'Pro';
              const price = name === 'Free' ? (currency === 'INR' ? '₹0' : '$0') : name === 'Enterprise' ? 'Custom' : 'Price to confirm';
              const term = name === 'Free' ? 'per year' : name === 'Enterprise' ? 'annual agreement' : `annual · ${plan} · ${currency}`;
              return (
                <Reveal key={name} delay={i * 60}>
                  <SpotlightCard className={`pricing-card ${isPro ? 'pricing-card--featured' : ''}`}>
                    {isPro && <span className="pricing-card__ribbon">Advanced review</span>}
                    <h2>{name}</h2>
                    <p className={`pricing-card__price ${price.length > 8 ? 'is-pending' : ''}`}>{price}</p>
                    <p className="pricing-card__term">{term}</p>
                    <p className="pricing-card__desc">{desc.args[0]}</p>
                    <div className="pricing-card__bottom">
                      <div className="actions"><Button to={action.args[1]} variant={isPro || name === 'Free' ? 'primary' : 'secondary'}>{action.args[0]}</Button></div>
                      <p className="pricing-card__approval">{APPROVAL[name] || 'Insert approved pricing and plan entitlements.'}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>

          <p className="reference-note">Pricing layout reference. Paid prices, allowances and checkout links intentionally remain unconfigured. The selectors demonstrate layout only; they do not calculate or quote a price.</p>

          <Reveal className="evaluation-note">
            <h2>Before you choose</h2>
            <Blocks blocks={page.sections.find((s) => s.heading === 'Before you choose').blocks} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
