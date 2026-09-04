export default function Stats({ content }) {
  return (
    <section className="stats" aria-label="Quick facts">
      <div className="wrap stats-grid">
        {content.stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-num tabular">
              {s.num}
              {s.suffix ? <span style={{ fontSize: ".55em", color: "var(--text-muted)" }}>{s.suffix}</span> : null}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
