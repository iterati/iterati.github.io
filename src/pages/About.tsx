import { Links } from '../components/Layout';
import { hello } from '../words';

// Bare until the captain writes it: the day-job line, the links and one Element.
export function About() {
  return (
    <main className="wrap page">
      <div className="about-grid">
        <div>
          <h1 className="label kicker">About</h1>
          <p className="day about-day">{hello.day}</p>
          <div className="links">
            <Links />
          </div>
        </div>
        <aside>
          <figure>
            <img src="/media/elements-rhodec.webp" alt="" width="300" height="300" />
            <figcaption className="label">one Element, from the corner</figcaption>
          </figure>
        </aside>
      </div>
    </main>
  );
}
