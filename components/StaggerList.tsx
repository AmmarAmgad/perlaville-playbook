"use client";

import { motion, useReducedMotion } from "motion/react";

const easeLuxury = [0.22, 1, 0.36, 1] as const;

/** A list whose items rise in one after another when scrolled into view. */
export default function StaggerList({
  items,
  className,
  itemClassName,
  x = 0,
  y = 12,
}: {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  x?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <ul className={className}>
        {items.map((item, index) => (
          <li key={index} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ shown: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, x, y },
            shown: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.6, ease: easeLuxury },
            },
          }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
