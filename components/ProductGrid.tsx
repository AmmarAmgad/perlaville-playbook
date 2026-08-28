"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      layout={reduceMotion ? false : "position"}
      className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.li
            key={product.id}
            layout={reduceMotion ? false : "position"}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, scale: 0.97, transition: { duration: 0.22 } }
            }
            viewport={reduceMotion ? undefined : { once: true, margin: "-40px" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.65,
                    delay: Math.min(index * 0.06, 0.42),
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            <ProductCard product={product} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
