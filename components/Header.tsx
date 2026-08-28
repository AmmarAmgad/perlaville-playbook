import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="container-page flex items-center justify-between py-6 sm:py-8">
        <Link
          href="/"
          aria-label="Perlaville — home"
          className="relative block h-11 w-[88px] overflow-hidden rounded-[4px] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] sm:h-12 sm:w-24"
        >
          <Image
            src="/images/perlaville-logo-dark.png"
            alt="Perlaville — Premium Daily Care"
            fill
            sizes="96px"
            priority
            className="object-cover object-[50%_67.5%]"
          />
        </Link>
        <nav aria-label="Primary">
          <Link
            href="/#products"
            className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-bark transition-colors duration-300 hover:text-cocoa"
          >
            Products
            <span className="block h-px w-5 bg-gold/50 transition-all duration-500 group-hover:w-7 group-hover:bg-gold" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
