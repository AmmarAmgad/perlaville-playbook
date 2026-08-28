"use client";

import { useState } from "react";
import { categories, products } from "@/data/products";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";

type Filter = (typeof categories)[number];

export default function CatalogueSection() {
  const [active, setActive] = useState<Filter>("All Products");

  const filtered =
    active === "All Products"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="products" className="container-page scroll-mt-6 pb-8 sm:pb-16">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-line pb-7">
        <div>
          <p className="eyebrow text-gold">The Collection</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-espresso sm:text-5xl">
            Our Products
          </h2>
        </div>
        <p
          className="pb-1 text-xs tracking-[0.18em] text-bark/60"
          aria-live="polite"
        >
          {filtered.length} {filtered.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </p>
      </div>

      <CategoryFilter<Filter>
        categories={categories}
        active={active}
        onChange={setActive}
        className="mt-8"
      />

      <ProductGrid products={filtered} />
    </section>
  );
}
