export default function Education({ content }) {
  return (
    <section id="education">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">Education &amp; Certifications</h2>
          <span className="sec-index">05 / RECORD</span>
        </div>
        <div className="edu-list">
          {content.education.map((e) => (
            <div className="edu-item" key={e.degree}>
              <div className="edu-when tabular">{e.when}</div>
              <div>
                <div className="edu-deg">{e.degree}</div>
                <div className="edu-org">{e.org}</div>
              </div>
              <div className="edu-score tabular">{e.score}</div>
            </div>
          ))}
        </div>
        <div className="cert-row">
          {content.certifications.map((c) => (
            <div className="cert-chip" key={c}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z" />
              </svg>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
