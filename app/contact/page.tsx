"use client";

import { useState, type JSX } from "react";
import Reveal from "../../src/components/Reveal";

export default function ContactPage(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subject = "DAXVORA discovery inquiry";
  const body = `${message}\n\n—\n${name} <${email}>`;
  const mailto = `mailto:hello@daxvora.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const canSend = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  const EXPECTATIONS = [
    "One conversation to understand your operation, team, and direction.",
    "A clear scope — no pre-packaged solution before the problem is understood.",
    "Discovery deliverables before any build begins.",
    "Explicit costs for every third-party dependency identified at scoping.",
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Start a discovery conversation">
        <div className="dot-grid hero__dot-grid" aria-hidden="true" />
        <div className="hero__bottom-rule" aria-hidden="true" />
        <div className="hero__inner">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Offers / commercial model / 07
          </span>
          <h1 className="hero__h1">
            Start with a conversation<br />
            about how your<br />
            operations actually work.
          </h1>
          <p className="hero__subtext">
            No pre-packaged solution before the problem is understood. Discovery
            scope is confirmed first, then the work begins.
          </p>
        </div>
      </section>

      {/* ── CONTACT LAYOUT ───────────────────────────────── */}
      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Contact form"
      >
        <div className="page-wrap">
          <div className="contact-layout">
            {/* Left: context */}
            <Reveal>
              <div>
                <h2 className="contact-info__headline">
                  What to expect from a discovery conversation
                </h2>

                <ul className="contact-expect" role="list">
                  {EXPECTATIONS.map((item) => (
                    <li key={item} className="contact-expect__item">
                      <span className="contact-expect__dot" aria-hidden="true" />
                      <p className="contact-expect__text">{item}</p>
                    </li>
                  ))}
                </ul>

                {/* Commercial structure */}
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: "var(--dx-carbon)",
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.005em",
                  }}
                >
                  How DAXVORA engages
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--dx-graphite)",
                    lineHeight: 1.65,
                    marginBottom: "1.25rem",
                  }}
                >
                  An initial contract payment confirms discovery, scope, and the
                  first committed phase. Each subsequent phase is paid before it
                  begins, tied to agreed deliverables and acceptance criteria.
                  After deployment, a minimal retainer covers service and
                  maintenance; new scope and usage costs remain separate and explicit.
                </p>

                <div className="contact-disclaimer" role="note">
                  Contact address shown is illustrative for this assessment.
                  DAXVORA&apos;s production domain and monitored inbox will be
                  configured at deployment. hello@daxvora.com currently has no
                  DNS/MX records (NXDOMAIN). With JavaScript enabled, sending opens
                  your email client with your inquiry pre-filled.
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={100}>
              <form
                id="contact-form"
                className="contact-form"
                action="mailto:hello@daxvora.com?subject=DAXVORA%20discovery%20inquiry"
                method="GET"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!canSend) return;
                  window.location.href = mailto;
                }}
                aria-label="Discovery inquiry form"
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="form-input"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-required="true"
                    aria-invalid={name.trim() === "" ? undefined : undefined}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="form-input"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    How does your operation run today?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    className="form-textarea"
                    placeholder="Describe your team size, the main bottlenecks, and what a good outcome looks like for you."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-required="true"
                  />
                  <p className="form-char-count">
                    {message.length} characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={!canSend}
                  aria-disabled={!canSend}
                  style={{
                    opacity: canSend ? 1 : 0.45,
                    cursor: canSend ? "pointer" : "not-allowed",
                  }}
                >
                  Send inquiry
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
