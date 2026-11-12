import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProduct, products } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Perlaville`,
      description: product.description,
      type: "website",
      images: [{ url: product.image, alt: product.alt }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const index = products.findIndex((p) => p.slug === product.slug);
  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];

  // Up to three other products: same category first, then by catalogue order after this one.
  const related = products
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({
      product: p,
      sameCategory: p.category === product.category ? 0 : 1,
      distance:
        (products.indexOf(p) - index + products.length) % products.length,
    }))
    .sort((a, b) => a.sameCategory - b.sameCategory || a.distance - b.distance)
    .slice(0, 3)
    .map((entry) => entry.product);

  return (
    <>
      <div className="container-page pt-8 sm:pt-10">
        <Link
          href="/#products"
          className="group inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-bark transition-colors duration-300 hover:text-cocoa"
        >
          <svg
            aria-hidden="true"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            className="transition-transform duration-500 ease-out [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
          >
            <path
              d="M5 1L1 5l4 4M1 5h12"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Products
        </Link>
      </div>

      <ProductDetails product={product} />

      <section
        aria-labelledby="related-heading"
        className="container-page mt-16 sm:mt-24"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line pb-6">
            <div>
              <p className="eyebrow text-gold">Keep exploring</p>
              <h2
                id="related-heading"
                className="mt-3 font-serif text-3xl font-medium tracking-tight text-espresso sm:text-4xl"
              >
                More from the range
              </h2>
            </div>
            <Link
              href="/#products"
              className="group inline-flex items-center gap-2 pb-1 text-[11px] font-medium uppercase tracking-[0.22em] text-bark transition-colors duration-300 hover:text-cocoa"
            >
              All products
              <span className="block h-px w-5 bg-gold/50 transition-all duration-500 group-hover:w-7 group-hover:bg-gold" />
            </Link>
          </div>
        </Reveal>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {related.map((item, i) => (
            <li key={item.slug} className={i === 2 ? "sm:hidden lg:block" : ""}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProductCard product={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Reveal className="container-page pb-4" y={14}>
        <nav
          aria-label="Product pagination"
          className="mt-14 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:gap-6"
        >
          <Link
            href={`/products/${prev.slug}`}
            className="group flex min-w-0 items-center gap-4 rounded-lg border border-transparent p-2 transition-colors duration-500 hover:border-line hover:bg-paper/40 sm:gap-5 sm:p-3"
            aria-label={`Previous product: ${prev.name}`}
          >
            <span className="relative hidden h-20 w-16 shrink-0 overflow-hidden rounded-md bg-gradient-to-b from-parchment to-linen/70 sm:block">
              <Image
                src={prev.image}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-2 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
            </span>
            <span className="min-w-0">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bark/50">
                <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1">
                  ←
                </span>
                Previous
              </span>
              <span className="mt-1.5 block truncate font-serif text-lg text-bark transition-colors duration-300 group-hover:text-cocoa sm:text-xl">
                {prev.name}
              </span>
            </span>
          </Link>
          <Link
            href={`/products/${next.slug}`}
            className="group flex min-w-0 items-center gap-4 rounded-lg border border-transparent p-2 transition-colors duration-500 hover:border-line hover:bg-paper/40 sm:gap-5 sm:p-3 justify-end text-right"
            aria-label={`Next product: ${next.name}`}
          >
            <span className="min-w-0">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bark/50">
                Next
                <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span className="mt-1.5 block truncate font-serif text-lg text-bark transition-colors duration-300 group-hover:text-cocoa sm:text-xl">
                {next.name}
              </span>
            </span>
            <span className="relative hidden h-20 w-16 shrink-0 overflow-hidden rounded-md bg-gradient-to-b from-parchment to-linen/70 sm:block">
              <Image
                src={next.image}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-2 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
            </span>
          </Link>
        </nav>
      </Reveal>
    </>
  );
}
