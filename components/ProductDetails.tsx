import Image from "next/image";
import type { Product } from "@/data/products";
import Reveal from "@/components/Reveal";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="eyebrow flex items-center gap-4 text-bark/70">
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </h2>
  );
}

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <article className="container-page pb-10 pt-4 sm:pt-6">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <Reveal className="lg:sticky lg:top-10" y={18}>
          <figure>
            <div className="relative aspect-square overflow-hidden rounded-lg border border-line bg-gradient-to-br from-parchment via-[#f3edE1] to-linen/80 sm:aspect-[4/5]">
              <div
                aria-hidden="true"
                className="absolute inset-x-16 top-12 h-32 rounded-full bg-white/40 blur-3xl"
              />
              <Image
                src={product.image}
                alt={product.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-contain p-10 [filter:drop-shadow(0_24px_28px_rgba(36,26,16,0.18))] sm:p-14"
              />
            </div>
            <figcaption className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-bark/50">
              {product.name} — {product.size}
            </figcaption>
          </figure>
        </Reveal>

        <div className="pb-2">
          <Reveal y={16}>
            <p className="eyebrow text-gold">{product.category}</p>
            <h1 className="mt-4 font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-espresso sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] uppercase tracking-[0.18em] text-bark/80">
              <span>{product.size}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold/70" />
              <span>{product.form}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold/70" />
              <span>No. {product.id}</span>
            </p>
            <div
              aria-hidden="true"
              className="mt-8 h-px w-14 bg-gradient-to-r from-gold to-gold/20"
            />
            <p className="mt-7 max-w-prose text-[1.05rem] leading-relaxed text-bark">
              {product.description}
            </p>
          </Reveal>

          <Reveal className="mt-12" y={18}>
            <section aria-label="Key ingredients">
              <SectionLabel>Key Ingredients</SectionLabel>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {product.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="rounded-full border border-line bg-white/55 px-4 py-2 text-[13px] tracking-wide text-espresso shadow-[0_1px_4px_-2px_rgba(36,26,16,0.12)]"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal className="mt-12" y={18}>
            <section aria-label="Benefits and product details">
              <SectionLabel>Benefits &amp; Product Details</SectionLabel>
              <ul className="mt-6 space-y-4">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-[1px] h-px w-5 shrink-0 translate-y-[-4px] bg-gold/70"
                    />
                    <span className="leading-relaxed text-bark">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal className="mt-14" y={18}>
            <details className="group border-t border-line pt-7">
              <summary className="flex cursor-pointer select-none items-center justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                <span className="eyebrow text-bark/70 transition-colors duration-300 group-hover:text-cocoa">
                  Internal Notes
                </span>
                <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-bark/45">
                  Internal only
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    className="transition-transform duration-300 group-open:rotate-180"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="mt-6 rounded-lg border border-gold/25 bg-parchment/60 p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                  Internal Perlaville information — not customer-facing
                </p>
                <ul className="mt-4 space-y-3.5">
                  {product.internalNotes.map((note) => (
                    <li key={note} className="flex gap-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70"
                      />
                      <span className="text-[13.5px] leading-relaxed text-bark">
                        {note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
