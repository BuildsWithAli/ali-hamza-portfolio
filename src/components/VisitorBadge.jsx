"use client";

import { useEffect, useState } from "react";

// Pings /api/stats once per browser session (guarded by sessionStorage so
// refreshing the page doesn't inflate the count) and shows the real,
// server-side total back. Fails silently — a missing counter shouldn't
// draw attention to itself on a portfolio.
export default function VisitorBadge() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      let alreadyCounted = false;
      try {
        alreadyCounted = sessionStorage.getItem("ah-visit-counted") === "1";
      } catch {}

      try {
        const res = await fetch("/api/stats", {
          method: alreadyCounted ? "GET" : "POST",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.views === "number") setCount(data.views);
        if (!alreadyCounted) {
          try {
            sessionStorage.setItem("ah-visit-counted", "1");
          } catch {}
        }
      } catch {
        // Stats endpoint unavailable (e.g. Supabase not configured yet) — stay hidden.
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <span className="tabular" title="Real visits recorded by the backend">
      {count.toLocaleString()} visits
    </span>
  );
}
