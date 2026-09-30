import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import Blocks from '../components/ui/Blocks.jsx';
import SmartLink from '../components/ui/SmartLink.jsx';
import useSpotlight from '../hooks/useSpotlight.js';

const ENQUIRY = ['Product and plans', 'Workflow demo', 'Enterprise', 'Partnership', 'Other'];
const WORKFLOW = ['Engineering review', 'Revision review', 'Supplier or customer review', 'Production or quality handoff', 'Other'];

function Field({ label, name, type = 'text', required, full, error, autoComplete }) {
  return (
    <label className={`field ${full ? 'field--full' : ''} ${error ? 'has-error' : ''}`}>
      <span className="field__label">{label}{required && <span className="field__req" aria-hidden="true"> *</span>}</span>
      <input type={type} name={name} required={required} autoComplete={autoComplete} aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined} />
      {error && <span className="field__error" id={`${name}-err`}>{error}</span>}
    </label>
  );
}

export default function ContactPage({ page }) {
  const { hash } = useLocation();
  const [enquiry, setEnquiry] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState('');
  const resultRef = useRef(null);
  const onMove = useSpotlight();
  const section = (h) => page.sections.find((s) => s.heading === h).blocks;

  useEffect(() => {
    if (hash.includes('enterprise')) setEnquiry('Enterprise');
    else if (hash.includes('demo')) setEnquiry('Workflow demo');
  }, [hash]);

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next = {};
    ['name', 'email', 'company', 'enquiry', 'message'].forEach((k) => { if (!String(f.get(k) || '').trim()) next[k] = 'Please complete this field.'; });
    const email = String(f.get('email') || '');
    if (!next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address so we can respond.';
    setErrors(next);
    if (Object.keys(next).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      setResult('');
      return;
    }
    setResult('Preview complete. No enquiry has been sent or saved. The development team must connect the live form before launch.');
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  };

  return (
    <>
      <span id="enterprise" className="anchor-target" />
      <PageHero page={page} mode="center" />
      <section className="section section--tight-top" id="demo">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="kicker">Start a conversation</p>
            <h2>One workflow.<br />A focused discussion.</h2>
            <Blocks blocks={section('Choose the conversation')} />
            <div className="contact-note glass">
              <h3>What a demo should cover</h3>
              <Blocks blocks={section('What a demo should cover')} />
            </div>
          </div>

          <form className="enquiry glass spot" onPointerMove={onMove} onSubmit={onSubmit} noValidate>
            <div className="enquiry__head">
              <h2>Tell us where context gets lost.</h2>
              <p>Reference form only. Nothing is sent or saved.</p>
            </div>
            <div className="enquiry__grid">
              <Field label="Full name" name="name" required autoComplete="name" error={errors.name} />
              <Field label="Work email" name="email" type="email" required autoComplete="email" error={errors.email} />
              <Field label="Company" name="company" required autoComplete="organization" error={errors.company} />
              <Field label="Role" name="role" autoComplete="organization-title" />
              <label className={`field field--full ${errors.enquiry ? 'has-error' : ''}`}>
                <span className="field__label">Enquiry type<span className="field__req" aria-hidden="true"> *</span></span>
                <select name="enquiry" required value={enquiry} onChange={(e) => setEnquiry(e.target.value)} aria-invalid={!!errors.enquiry}>
                  <option value="">Choose a conversation</option>
                  {ENQUIRY.map((x) => <option key={x}>{x}</option>)}
                </select>
                {errors.enquiry && <span className="field__error">{errors.enquiry}</span>}
              </label>
              <label className="field field--full">
                <span className="field__label">Workflow to review</span>
                <select name="workflow" defaultValue="">
                  <option value="">Select a workflow</option>
                  {WORKFLOW.map((x) => <option key={x}>{x}</option>)}
                </select>
              </label>
              <label className={`field field--full ${errors.message ? 'has-error' : ''}`}>
                <span className="field__label">What is difficult today?<span className="field__req" aria-hidden="true"> *</span></span>
                <textarea name="message" rows={4} required aria-describedby="message-help" aria-invalid={!!errors.message} />
                {errors.message && <span className="field__error">{errors.message}</span>}
                <span id="message-help" className="field__help">Describe one repeated drawing question, review or handoff. Do not include confidential drawings or restricted information.</span>
              </label>
              <Field label="Current systems (optional)" name="systems" />
              <Field label="Country / region" name="country" autoComplete="country-name" />
              <Field label="Time zone" name="timezone" />
              <Field label="Work phone (optional)" name="phone" type="tel" autoComplete="tel" />
            </div>
            <p className="field__help enquiry__privacy">Read our <SmartLink to="{{legal.privacy_url}}" className="inline-btn">Privacy Notice</SmartLink> to understand how enquiry information is handled.</p>
            <button type="submit" className="btn btn--primary btn--block"><span>Preview enquiry action</span></button>
            {result && <p className="form-result" role="status" ref={resultRef}>{result}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
