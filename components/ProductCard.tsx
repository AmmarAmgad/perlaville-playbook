import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-[#fbf8f2] shadow-[0_2px_10px_-6px_rgba(36,26,16,0.12)] transition-all duration-500 ease-out [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-[0_28px_48px_-24px_rgba(36,26,16,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <div className="relative m-3 mb-0 aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-b from-parchment via-[#f2ecdf] to-linen/70">
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-6 h-24 rounded-full bg-white/35 blur-2xl"
        />
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          className="object-contain p-8 [filter:drop-shadow(0_18px_22px_rgba(36,26,16,0.16))] transition-transform duration-700 ease-out [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold">
          {product.category}
        </p>
        <h3 className="mt-2 font-serif text-[1.55rem] font-medium leading-snug text-espresso">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[13px] tracking-wide text-bark/75">
          {product.size} · {product.form}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[10.5px] font-medium uppercase tracking-[0.22em] text-bark/55 transition-colors duration-300 group-hover:text-cocoa">
          View Product
          <svg
            aria-hidden="true"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            className="transition-transform duration-500 ease-out [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          >
            <path
              d="M9 1l4 4-4 4M13 5H1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
