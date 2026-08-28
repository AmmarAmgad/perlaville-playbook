"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const easeLuxury = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: easeLuxury },
        };

  return (
    <section className="container-page pb-16 pt-14 text-center sm:pb-24 sm:pt-24">
      <motion.p {...enter(0)} className="eyebrow text-gold">
        Internal Product Playbook
      </motion.p>

      <motion.h1
        {...enter(0.1)}
        className="mt-6 font-serif text-6xl font-medium leading-[1.05] tracking-tight text-espresso sm:text-7xl lg:text-8xl"
      >
        Perlaville
      </motion.h1>

      <motion.div
        {...enter(0.2)}
        aria-hidden="true"
        className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
      />

      <motion.p
        {...enter(0.28)}
        className="mx-auto mt-7 max-w-md font-serif text-2xl italic leading-snug text-bark sm:text-[1.7rem]"
      >
        Premium beauty-care product catalogue.
      </motion.p>

      <motion.p
        {...enter(0.36)}
        className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-bark/75 sm:text-[0.95rem]"
      >
        Ten considered formulations across hair and body — the complete
        Perlaville range in one reference.
      </motion.p>

      <motion.div {...enter(0.46)} className="mt-12">
        <Link
          href="/#products"
          className="group inline-flex flex-col items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-bark transition-colors duration-300 hover:text-cocoa"
        >
          Explore the catalogue
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-4 w-px bg-gold/60 transition-colors duration-300 group-hover:bg-gold"
          />
        </Link>
      </motion.div>
    </section>
  );
}
