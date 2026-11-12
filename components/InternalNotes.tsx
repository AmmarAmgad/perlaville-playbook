"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const easeLuxury = [0.22, 1, 0.36, 1] as const;

export default function InternalNotes({ notes }: { notes: string[] }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <div className="border-t border-line pt-7">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full cursor-pointer select-none items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span className="eyebrow text-bark/70 transition-colors duration-300 group-hover:text-cocoa">
          Internal Notes
        </span>
        <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-bark/45">
          Internal only
          <svg
            aria-hidden="true"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className={`transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: easeLuxury }}
            className="overflow-hidden"
          >
            <div className="mt-6 rounded-lg border border-gold/25 bg-parchment/60 p-5 sm:p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                Internal Perlaville information — not customer-facing
              </p>
              <ul className="mt-4 space-y-3.5">
                {notes.map((note, index) => (
                  <motion.li
                    key={note}
                    className="flex gap-3.5"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion ? 0 : 0.12 + index * 0.07,
                      ease: easeLuxury,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70"
                    />
                    <span className="text-[13.5px] leading-relaxed text-bark">
                      {note}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
