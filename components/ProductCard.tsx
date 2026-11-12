"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { Product } from "@/data/products";

const spring = { stiffness: 140, damping: 16, mass: 0.5 };

export default function ProductCard({ product }: { product: Product }) {
  const reduceMotion = useReducedMotion();

  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const shiftX = useSpring(0, spring);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(30);
  const sheen = useMotionTemplate`radial-gradient(260px circle at ${sheenX}% ${sheenY}%, var(--sheen), transparent 70%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 10);
    shiftX.set((px - 0.5) * 10);
    sheenX.set(px * 100);
    sheenY.set(py * 100);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    shiftX.set(0);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-card shadow-[0_2px_10px_-6px_rgba(36,26,16,0.12)] transition-all duration-500 ease-out [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-[0_28px_48px_-24px_rgba(36,26,16,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative m-3 mb-0 aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-b from-parchment via-mist to-linen/70 [perspective:900px]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-6 h-24 rounded-full bg-glow/35 blur-2xl"
        />
        <motion.div
          aria-hidden="true"
          style={{ backgroundImage: sheen }}
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <motion.div
          style={reduceMotion ? undefined : { rotateX, rotateY, x: shiftX }}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
            className="object-contain p-8 [filter:drop-shadow(0_18px_22px_rgba(36,26,16,0.16))] transition-transform duration-700 ease-out [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </motion.div>
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
