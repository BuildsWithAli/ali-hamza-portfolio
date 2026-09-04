export default function Projects({ content }) {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">Selected Work</h2>
          <span className="sec-index">03 / PROJECTS</span>
        </div>

        <div className="proj-featured">
          {content.featuredProjects.map((p) => (
            <div className="panel proj-card" key={p.name}>
              <div className="proj-top">
                <span className="proj-num">{p.num}</span>
                <span className="tag">{p.badge}</span>
              </div>
              <div className="proj-name">{p.name}</div>
              <ul className="bullets">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="proj-tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="proj-grid">
          {content.miniProjects.map((p) => (
            <div className="panel proj-mini" key={p.name}>
              <div className="proj-name">{p.name}</div>
              <p>{p.copy}</p>
              <div className="proj-tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
