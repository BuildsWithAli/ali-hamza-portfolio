export const dynamic = "force-dynamic";

const ERROR_MESSAGES = {
  "1": "Wrong password — try again.",
  not_configured: "ADMIN_PASSWORD isn't set in your environment variables yet (see README.md).",
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error ? ERROR_MESSAGES[params.error] || "Something went wrong." : null;

  return (
    <main className="admin-shell">
      <div className="panel admin-login">
        <h1>Admin</h1>
        <p>Sign in to view messages, visitor stats, and edit your site's content.</p>
        <form className="contact-form" method="POST" action="/api/admin/login">
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
          {error && <p className="form-note err">{error}</p>}
        </form>
      </div>
    </main>
  );
}