import ContactForm from "./ContactForm";

export default function Contact({ content }) {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="panel contact-panel">
          <div className="contact-left">
            <div className="eyebrow" style={{ marginBottom: 18 }}>06 / Contact</div>
            <div className="contact-title">{content.contactTitle}</div>
            <p className="contact-copy">{content.contactCopy}</p>
            <ContactForm />
          </div>
          <div className="contact-right">
            <a className="contact-link" href={`mailto:${content.email}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <path d="m4 6.5 8 6 8-6" />
              </svg>
              {content.email}
            </a>
            <a className="contact-link" href={`tel:${content.phone.replace(/\s+/g, "")}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1.3 1.3 0 0 1 1.3-.3 9 9 0 0 0 2.8.45 1.3 1.3 0 0 1 1.3 1.3V20a1.3 1.3 0 0 1-1.3 1.3A16.5 16.5 0 0 1 2.7 4.8 1.3 1.3 0 0 1 4 3.5h3.35a1.3 1.3 0 0 1 1.3 1.3 9 9 0 0 0 .45 2.8 1.3 1.3 0 0 1-.3 1.3L6.6 10.8Z" />
              </svg>
              {content.phone}
            </a>
            <a className="contact-link" href={content.github} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
              {content.githubLabel}
            </a>
            <a className="contact-link" href={content.linkedin} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.87c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V20H9.5V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.46 2.25 4.46 5.18V20Z" />
              </svg>
              {content.linkedinLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
