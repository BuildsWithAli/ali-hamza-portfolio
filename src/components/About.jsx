export default function About({ content }) {
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">About</h2>
          <span className="sec-index">01 / SUMMARY</span>
        </div>
        <div className="about-grid">
          <div className="panel about-summary">
            <div className="panel-label">
              <span>PROFILE.TXT</span>
              <span>{content.location.toUpperCase()}</span>
            </div>
            {content.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="panel">
            <div className="panel-label">
              <span>FOCUS AREAS</span>
            </div>
            <ul className="focus-list">
              {content.focusAreas.map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m5 12 5 5L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
