"use client";

import { useState } from "react";

const STATE = { IDLE: "idle", SENDING: "sending", OK: "ok", ERROR: "error" };

export default function ContactForm() {
  const [status, setStatus] = useState(STATE.IDLE);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus(STATE.ERROR);
      setErrorMsg("Please fill in every field.");
      return;
    }

    setStatus(STATE.SENDING);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus(STATE.ERROR);
        setErrorMsg(data.error || "Something went wrong sending that. Try again in a moment.");
        return;
      }

      setStatus(STATE.OK);
      form.reset();
    } catch {
      setStatus(STATE.ERROR);
      setErrorMsg("Network error — check your connection and try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
      </div>
      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} placeholder="What are you reaching out about?" required />
      </div>
      <button className="btn btn-primary" type="submit" disabled={status === STATE.SENDING}>
        {status === STATE.SENDING ? "Sending…" : "Send Message"}
      </button>
      {status === STATE.OK && <p className="form-note ok">Thanks — your message is in. I'll reply by email soon.</p>}
      {status === STATE.ERROR && <p className="form-note err">{errorMsg}</p>}
    </form>
  );
}
