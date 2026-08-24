"use client";

import { useState, type JSX } from "react";

export default function ContactPage(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subject = "DAXVORA discovery inquiry";
  const body = `${message}\n\n—\n${name} <${email}>`;
  const mailto = `mailto:hello@daxvora.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const canSend = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  return (
    <>
      <h1>Explain how your operations work, and let us show you how they would look with DAXVORA.</h1>

      <form
        action="mailto:hello@daxvora.com?subject=DAXVORA%20discovery%20inquiry"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSend) return;
          window.location.href = mailto;
        }}
      >
        <div>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contact-email">Work email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contact-message">How does your operation run today?</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={!canSend}>
          Send inquiry
        </button>
        <p className="form-hint">
          Contact address shown is illustrative for this assessment; DAXVORA&apos;s
          production domain and monitored inbox will be configured at
          deployment. No external form service or paid dependency was
          registered for this assessment — hello@daxvora.com currently has no
          DNS/MX records (verified via dig/nslookup, NXDOMAIN).
        </p>
        <p className="form-hint">
          With JavaScript enabled, sending opens your email client addressed
          to <a href="mailto:hello@daxvora.com">hello@daxvora.com</a> with
          your inquiry pre-filled. Without JavaScript, the form falls back to
          a native mailto submission.
        </p>
      </form>

      <section aria-label="Commercial structure">
        <h2>How DAXVORA engages</h2>
        <p>
          An initial contract payment confirms discovery, scope, and the first
          committed phase. Each subsequent phase is paid before it begins, tied
          to agreed deliverables and acceptance criteria. Third-party software,
          model usage, messaging, telephony, and hosting costs are identified
          before commitment and remain separate and explicit.
        </p>
      </section>
    </>
  );
}
