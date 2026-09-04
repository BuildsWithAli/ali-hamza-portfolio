import VisitorBadge from "./VisitorBadge";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-row">
        <span>&copy; {new Date().getFullYear()} Ali Hamza &middot; Lahore, Pakistan</span>
        <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <VisitorBadge />
          <span>// node network live above</span>
        </span>
      </div>
    </footer>
  );
}
