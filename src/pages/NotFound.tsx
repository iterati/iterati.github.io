// Where the old blog's post addresses land.
export function NotFound() {
  return (
    <main className="wrap page">
      <p className="label kicker">404</p>
      <h1>Not found</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/notes/">Notes</a>
      </div>
    </main>
  );
}
