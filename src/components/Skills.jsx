export default function Skills({ content }) {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">Skills</h2>
          <span className="sec-index">04 / STACK</span>
        </div>
        <div className="skills-grid">
          {content.skillGroups.map((g) => (
            <div className="panel skill-group" key={g.title}>
              <div className="skill-group-title">{g.title}</div>
              <div className="skill-chips">
                {g.chips.map((c) => (
                  <span className="tag" key={c}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
