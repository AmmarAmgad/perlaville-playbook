"use client";

import { motion, useReducedMotion } from "motion/react";

type CategoryFilterProps<T extends string> = {
  categories: readonly T[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
};

export default function CategoryFilter<T extends string>({
  categories,
  active,
  onChange,
  className,
}: CategoryFilterProps<T>) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      role="group"
      aria-label="Filter products by category"
      className={`flex flex-wrap gap-2.5 sm:gap-3 ${className ?? ""}`}
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className="relative rounded-full border border-line bg-white/45 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:border-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {isActive && (
              <motion.span
                layoutId="category-active-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-espresso shadow-[0_10px_22px_-12px_rgba(36,26,16,0.55)]"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", duration: 0.6, bounce: 0.12 }
                }
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                isActive ? "text-ivory" : "text-bark"
              }`}
            >
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
