// Page fade-in on every navigation. Plain CSS (see .page-enter in globals.css)
// so content shows as soon as the HTML arrives, before any JavaScript loads.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
