"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { assetPath } from "@/lib/assets";
import ThemeToggle from "@/components/ThemeToggle";

/** Scroll distance in one direction needed before the header hides or returns. */
const TRAVEL_THRESHOLD = 12;

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const travel = useRef(0);

  useMotionValueEvent(scrollY, "change", (raw) => {
    // Clamp away overscroll "bounce" at the top and bottom of the page.
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.min(Math.max(raw, 0), Math.max(maxY, 0));
    const delta = y - lastY.current;
    lastY.current = y;

    setScrolled(y > 24);

    if (y < 120) {
      travel.current = 0;
      setHidden(false);
      return;
    }
    if (delta === 0) return;

    // Count travel in the current direction; reversing starts the count again.
    if (Math.sign(delta) !== Math.sign(travel.current)) travel.current = 0;
    travel.current += delta;

    if (travel.current > TRAVEL_THRESHOLD) setHidden(true);
    else if (travel.current < -TRAVEL_THRESHOLD) setHidden(false);
  });

  return (
    // The spacer holds the header's full height so the page never shifts when
    // the header compacts, hides or returns. 113px = 56px logo + 2 × 28px padding + 1px border.
    <div className="h-[85px] sm:h-[113px]">
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] has-[:focus-visible]:translate-y-0 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "border-line/80 bg-ivory/80 shadow-[0_10px_30px_-22px_rgba(36,26,16,0.35)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-page flex items-center justify-between transition-[padding] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? "py-3" : "py-5 sm:py-7"
          }`}
        >
          <Link
            href="/"
            aria-label="Perlaville — home"
            className="relative block h-11 w-[87px] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] sm:h-14 sm:w-[111px]"
          >
            <Image
              src={assetPath("/images/perlaville-logo-header.png")}
              alt="Perlaville — Premium Daily Care"
              fill
              sizes="111px"
              priority
              className="object-contain dark:hidden"
            />
            <Image
              src={assetPath("/images/perlaville-logo-footer.png")}
              alt=""
              fill
              sizes="111px"
              className="hidden object-contain dark:block"
            />
          </Link>
          <div className="flex items-center gap-5 sm:gap-7">
            <nav aria-label="Primary">
              <Link
                href="/#products"
                className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-bark transition-colors duration-300 hover:text-cocoa"
              >
                Products
                <span className="block h-px w-5 bg-gold/50 transition-all duration-500 group-hover:w-7 group-hover:bg-gold" />
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
