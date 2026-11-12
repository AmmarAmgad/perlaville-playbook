"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { categories, products } from "@/data/products";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";

type Filter = (typeof categories)[number];

const panelTitles: Record<Filter, string> = {
  "All Products": "The Perlaville range",
  "Hair Products": "The hair care range",
  "Body Products": "The body care range",
};

export default function CatalogueSection() {
  const [active, setActive] = useState<Filter>("All Products");
  const reduceMotion = useReducedMotion();

  const filtered =
    active === "All Products"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="products" className="container-page scroll-mt-24 pb-4 sm:pb-8">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-line pb-7">
        <div>
          <p className="eyebrow text-gold">The Collection</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-espresso sm:text-5xl">
            Our Products
          </h2>
        </div>
        <p
          className="flex items-baseline gap-[0.5em] pb-1 text-xs tracking-[0.18em] text-bark/60"
          aria-live="polite"
        >
          <span className="relative inline-flex overflow-hidden tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={filtered.length}
                className="inline-block"
                initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {filtered.length}
              </motion.span>
            </AnimatePresence>
          </span>
          {filtered.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </p>
      </div>

      <CategoryFilter<Filter>
        categories={categories}
        active={active}
        onChange={setActive}
        className="mt-8"
      />

      <ProductGrid products={filtered} panelTitle={panelTitles[active]} />
    </section>
  );
}
