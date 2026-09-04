export default function Experience({ content }) {
  const xp = content.experience;
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">Experience</h2>
          <span className="sec-index">02 / EXPERIENCE</span>
        </div>
        <div className="panel">
          <div className="xp-row">
            <div className="xp-when">
              {xp.when}
              <br />
              <span className="now">&middot; {xp.whenNote}</span>
            </div>
            <div>
              <div className="xp-role">{xp.role}</div>
              <div className="xp-org">{xp.org}</div>
              <ul className="bullets">
                {xp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="xp-tags">
                {xp.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
