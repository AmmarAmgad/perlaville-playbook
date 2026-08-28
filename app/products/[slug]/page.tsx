import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import Reveal from "@/components/Reveal";

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

      <Reveal className="container-page pb-4" y={14}>
        <nav
          aria-label="Product pagination"
          className="mt-14 flex items-stretch justify-between gap-6 border-t border-line pt-8"
        >
          <Link
            href={`/products/${prev.slug}`}
            className="group min-w-0"
            aria-label={`Previous product: ${prev.name}`}
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-bark/50">
              ← Previous
            </span>
            <span className="mt-1.5 block truncate font-serif text-lg text-bark transition-colors duration-300 group-hover:text-cocoa sm:text-xl">
              {prev.name}
            </span>
          </Link>
          <Link
            href={`/products/${next.slug}`}
            className="group min-w-0 text-right"
            aria-label={`Next product: ${next.name}`}
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-bark/50">
              Next →
            </span>
            <span className="mt-1.5 block truncate font-serif text-lg text-bark transition-colors duration-300 group-hover:text-cocoa sm:text-xl">
              {next.name}
            </span>
          </Link>
        </nav>
      </Reveal>
    </>
  );
}
