import Scene3D from "./Scene3D";

export default function Hero({ content }) {
  return (
    <section className="hero" id="hero-section">
      <Scene3D />
      <div className="hero-scrim" />
      <div className="wrap hero-inner">
        <div className="hero-kicker eyebrow load-in">{content.kicker}</div>
        <h1 className="hero-name load-in d1">{content.name}</h1>
        <p className="hero-role load-in d2">
          Building at the seam of <em>{content.tagline_a}</em> and <em>{content.tagline_b}</em> &mdash; {content.tagline_rest}
        </p>
        <p className="hero-summary load-in d3">{content.summary}</p>
        <div className="hero-ctas load-in d4">
          <a href="#work" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </div>
        <div className="hero-meta load-in d5">
          <span><span className="dot" />&nbsp;{content.location}</span>
          <a href={`mailto:${content.email}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="m4 6.5 8 6 8-6" />
            </svg>
            {content.email}
          </a>
          <a href={content.github} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
            GitHub
          </a>
          <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.87c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V20H9.5V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.46 2.25 4.46 5.18V20Z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
