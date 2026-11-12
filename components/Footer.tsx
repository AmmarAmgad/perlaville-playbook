import Image from "next/image";
import { assetPath } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-transparent bg-gradient-to-b from-[#2a1f13] to-ink text-cream dark:border-line dark:from-[#1f1710] dark:to-[#0e0b07] sm:mt-24">
      <div className="container-page flex flex-col items-center gap-8 py-16 text-center">
        <div className="relative h-[91px] w-[180px] sm:h-[106px] sm:w-[210px]">
          <Image
            src={assetPath("/images/perlaville-logo-footer.png")}
            alt="Perlaville — Premium Daily Care"
            fill
            sizes="210px"
            className="object-contain"
          />
        </div>
        <div className="space-y-2.5">
          <p className="text-[11px] uppercase tracking-[0.26em] text-gold-soft">
            Internal Product Playbook
          </p>
          <p className="text-sm tracking-wide text-cream/55">
            Premium Daily Care — the complete Perlaville catalogue in one reference.
          </p>
        </div>
        <div aria-hidden="true" className="h-px w-14 bg-gold/30" />
        <p className="text-[11px] tracking-wide text-cream/35">
          © {new Date().getFullYear()} Perlaville. For internal use only.
        </p>
      </div>
    </footer>
  );
}
