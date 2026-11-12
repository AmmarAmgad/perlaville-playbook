import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow text-gold">Error 404</p>
      <h1 className="mt-5 font-serif text-5xl font-medium tracking-tight text-espresso sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-bark/75">
        The page you are looking for does not exist in the Perlaville playbook.
      </p>
      <Link
        href="/"
        className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/50 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-bark transition-all duration-300 hover:border-gold/40 hover:text-cocoa"
      >
        <span
          aria-hidden="true"
          className="block h-px w-4 bg-gold/60 transition-all duration-500 group-hover:w-6"
        />
        Back to the catalogue
      </Link>
    </div>
  );
}
