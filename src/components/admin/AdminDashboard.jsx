"use client";

import { useState } from "react";

const SIMPLE_FIELDS = [
  ["name", "Name"],
  ["role", "Role"],
  ["kicker", "Hero kicker"],
  ["tagline_a", "Tagline — part A"],
  ["tagline_b", "Tagline — part B"],
  ["tagline_rest", "Tagline — rest"],
  ["summary", "Hero summary"],
  ["location", "Location"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["github", "GitHub URL"],
  ["githubLabel", "GitHub label"],
  ["linkedin", "LinkedIn URL"],
  ["linkedinLabel", "LinkedIn label"],
  ["contactTitle", "Contact title"],
  ["contactCopy", "Contact copy"],
];

const LIST_FIELDS = [
  ["about", "About paragraphs (one per line)"],
  ["focusAreas", "Focus areas (one per line)"],
  ["certifications", "Certifications (one per line)"],
];

const JSON_FIELDS = [
  ["stats", "Stats tiles"],
  ["experience", "Experience"],
  ["featuredProjects", "Featured projects"],
  ["miniProjects", "Smaller projects"],
  ["skillGroups", "Skill groups"],
  ["education", "Education"],
];

export default function AdminDashboard({ initialContent, initialMessages, initialViews, supabaseConfigured }) {
  const [content, setContent] = useState(initialContent);
  const [listText, setListText] = useState(() =>
    Object.fromEntries(LIST_FIELDS.map(([key]) => [key, (initialContent[key] || []).join("\n")]))
  );
  const [jsonText, setJsonText] = useState(() =>
    Object.fromEntries(JSON_FIELDS.map(([key]) => [key, JSON.stringify(initialContent[key], null, 2)]))
  );
  const [jsonErrors, setJsonErrors] = useState({});
  const [saveState, setSaveState] = useState({ status: "idle", message: "" });
  const [messages, setMessages] = useState(initialMessages);

  function updateSimple(key, value) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function handleSave() {
    // Parse list fields
    const nextContent = { ...content };
    LIST_FIELDS.forEach(([key]) => {
      nextContent[key] = listText[key].split("\n").map((s) => s.trim()).filter(Boolean);
    });

    // Parse JSON fields, collecting errors
    const errors = {};
    JSON_FIELDS.forEach(([key]) => {
      try {
        nextContent[key] = JSON.parse(jsonText[key]);
      } catch (e) {
        errors[key] = "Invalid JSON — " + e.message;
      }
    });
    setJsonErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSaveState({ status: "error", message: "Fix the highlighted JSON fields before saving." });
      return;
    }

    setSaveState({ status: "saving", message: "" });
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextContent),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveState({ status: "error", message: data.error || "Save failed." });
        return;
      }
      setContent(nextContent);
      setSaveState({ status: "ok", message: "Saved — your live site now reflects these changes." });
    } catch {
      setSaveState({ status: "error", message: "Network error while saving." });
    }
  }

  async function markRead(id) {
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, read: true } : m)));
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }

  async function deleteMessage(id) {
    setMessages((ms) => ms.filter((m) => m.id !== id));
    await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
  }

  return (
    <div className="admin-shell">
      <div className="admin-head">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>Admin</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Signed in — managing alirana0405@gmail.com's site</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/" className="btn btn-ghost">View Site</a>
          <form method="POST" action="/api/admin/logout">
            <button className="btn btn-ghost" type="submit">Log Out</button>
          </form>
        </div>
      </div>

      {!supabaseConfigured && (
        <div className="panel admin-section">
          <p className="admin-empty">
            Supabase isn't configured yet, so messages, visitor stats, and saved content edits won't persist.
            Add the Supabase environment variables from README.md to enable them.
          </p>
        </div>
      )}

      <div className="admin-section">
        <h2>Visitor Stats</h2>
        <div className="panel admin-stat-row">
          <div className="stat" style={{ borderLeft: "none", padding: 0 }}>
            <div className="stat-num tabular">{initialViews === null ? "—" : initialViews.toLocaleString()}</div>
            <div className="stat-label">Total Page Views</div>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h2>Messages ({messages.length})</h2>
        <div className="panel">
          {messages.length === 0 && <p className="admin-empty">No messages yet.</p>}
          {messages.map((m) => (
            <div className="msg-item" key={m.id}>
              <div className="msg-meta">
                <span className={m.read ? "" : "msg-unread"}>{m.read ? "Read" : "● Unread"}</span>
                <span>{m.name} &lt;{m.email}&gt;</span>
                <span>{new Date(m.created_at).toLocaleString()}</span>
              </div>
              <div className="msg-body">{m.message}</div>
              <div style={{ display: "flex", gap: 8 }}>
                {!m.read && (
                  <button className="btn btn-ghost" style={{ padding: "6px 12px" }} onClick={() => markRead(m.id)} type="button">
                    Mark read
                  </button>
                )}
                <button className="btn btn-ghost" style={{ padding: "6px 12px" }} onClick={() => deleteMessage(m.id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h2>Edit Content</h2>
        <div className="panel">
          {SIMPLE_FIELDS.map(([key, label]) => (
            <div className="admin-field" key={key}>
              <label htmlFor={`f-${key}`}>{label}</label>
              {key === "summary" || key === "contactCopy" || key === "contactTitle" ? (
                <textarea id={`f-${key}`} rows={3} value={content[key] || ""} onChange={(e) => updateSimple(key, e.target.value)} />
              ) : (
                <input id={`f-${key}`} type="text" value={content[key] || ""} onChange={(e) => updateSimple(key, e.target.value)} />
              )}
            </div>
          ))}

          {LIST_FIELDS.map(([key, label]) => (
            <div className="admin-field" key={key}>
              <label htmlFor={`l-${key}`}>{label}</label>
              <textarea
                id={`l-${key}`}
                rows={4}
                value={listText[key]}
                onChange={(e) => setListText((t) => ({ ...t, [key]: e.target.value }))}
              />
            </div>
          ))}

          <details>
            <summary style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
              Advanced — projects, skills, education &amp; stats (JSON)
            </summary>
            {JSON_FIELDS.map(([key, label]) => (
              <div className="admin-field" key={key}>
                <label htmlFor={`j-${key}`}>{label}</label>
                <textarea
                  id={`j-${key}`}
                  rows={10}
                  style={{ fontFamily: "var(--font-mono)", fontSize: 12.5 }}
                  value={jsonText[key]}
                  onChange={(e) => setJsonText((t) => ({ ...t, [key]: e.target.value }))}
                />
                {jsonErrors[key] && <p className="form-note err">{jsonErrors[key]}</p>}
              </div>
            ))}
          </details>

          <button className="btn btn-primary" type="button" onClick={handleSave} disabled={saveState.status === "saving"}>
            {saveState.status === "saving" ? "Saving…" : "Save Changes"}
          </button>
          {saveState.status === "ok" && <p className="form-note ok">{saveState.message}</p>}
          {saveState.status === "error" && <p className="form-note err">{saveState.message}</p>}
        </div>
      </div>
    </div>
  );
}
