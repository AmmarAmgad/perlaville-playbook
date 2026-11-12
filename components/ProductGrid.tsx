"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import RangePanel from "@/components/RangePanel";

const lgSpan = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"] as const;

export default function ProductGrid({
  products,
  panelTitle,
}: {
  products: Product[];
  panelTitle: string;
}) {
  const reduceMotion = useReducedMotion();

  // The closing panel takes whatever is left of the last row at each breakpoint.
  const panelSpan = `${products.length % 2 === 0 ? "sm:col-span-2" : "sm:col-span-1"} ${
    lgSpan[products.length % 3]
  }`;

  const itemMotion = (index: number) => ({
    layout: reduceMotion ? false : ("position" as const),
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0 } }
      : { opacity: 0, scale: 0.97, transition: { duration: 0.22 } },
    viewport: reduceMotion ? undefined : { once: true, margin: "-40px" },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.65,
          delay: Math.min(index * 0.06, 0.42),
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  return (
    <motion.ul
      layout={reduceMotion ? false : "position"}
      className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.li key={product.id} {...itemMotion(index)}>
            <ProductCard product={product} />
          </motion.li>
        ))}
        <motion.li
          key={`panel-${panelTitle}`}
          {...itemMotion(products.length)}
          className={panelSpan}
        >
          <RangePanel products={products} title={panelTitle} />
        </motion.li>
      </AnimatePresence>
    </motion.ul>
  );
}
