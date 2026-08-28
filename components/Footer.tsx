import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-b from-[#2a1f13] to-espresso text-ivory sm:mt-32">
      <div className="container-page flex flex-col items-center gap-8 py-16 text-center">
        <div className="relative h-24 w-48 overflow-hidden rounded-[4px] sm:h-28 sm:w-56">
          <Image
            src="/images/perlaville-logo.png"
            alt="Perlaville — Premium Daily Care"
            fill
            sizes="224px"
            className="object-cover object-[50%_67.5%]"
          />
        </div>
        <div className="space-y-2.5">
          <p className="text-[11px] uppercase tracking-[0.26em] text-gold-soft">
            Internal Product Playbook
          </p>
          <p className="text-sm tracking-wide text-ivory/55">
            Premium Daily Care — the complete Perlaville catalogue in one reference.
          </p>
        </div>
        <div aria-hidden="true" className="h-px w-14 bg-gold/30" />
        <p className="text-[11px] tracking-wide text-ivory/35">
          © {new Date().getFullYear()} Perlaville. For internal use only.
        </p>
      </div>
    </footer>
  );
}
