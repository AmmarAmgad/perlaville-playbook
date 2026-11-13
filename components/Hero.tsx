"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { assetPath } from "@/lib/assets";

const TITLE = "Perlaville";

type Bottle = {
  src: string;
  width: number;
  height: number;
  /** Tailwind classes for placement, size and breakpoint visibility. */
  className: string;
  rotate: number;
  /** Parallax strength — larger moves further. */
  depth: number;
  floatDuration: number;
  delay: number;
};

const bottles: Bottle[] = [
  {
    src: "/images/hair-tonic.png",
    width: 941,
    height: 1672,
    className: "left-[5%] top-[5%] w-[clamp(108px,12vw,184px)]",
    rotate: -8,
    depth: 1,
    floatDuration: 7,
    delay: 0.35,
  },
  {
    src: "/images/hair-conditioner.png",
    width: 1024,
    height: 1536,
    className: "left-[19%] top-[49%] hidden w-[clamp(96px,9.4vw,144px)] xl:block",
    rotate: 7,
    depth: 0.55,
    floatDuration: 8.5,
    delay: 0.55,
  },
  {
    src: "/images/hair-serum.png",
    width: 941,
    height: 1672,
    className: "right-[5%] top-[8%] w-[clamp(104px,11.5vw,176px)]",
    rotate: 8,
    depth: 0.9,
    floatDuration: 7.8,
    delay: 0.45,
  },
  {
    src: "/images/oily-skin-cleanser.png",
    width: 941,
    height: 1672,
    className: "right-[19%] top-[46%] hidden w-[clamp(92px,9vw,138px)] xl:block",
    rotate: -6,
    depth: 0.6,
    floatDuration: 9,
    delay: 0.65,
  },
];

const mobileRow = [
  { src: "/images/hair-conditioner.png", width: 1024, height: 1536, className: "w-[15%] translate-y-1" },
  { src: "/images/hair-tonic.png", width: 941, height: 1672, className: "w-[17%]" },
  { src: "/images/hair-serum.png", width: 941, height: 1672, className: "w-[19%]" },
  { src: "/images/oily-skin-cleanser.png", width: 941, height: 1672, className: "w-[17%]" },
  { src: "/images/anti-dandruff-shampoo.png", width: 864, height: 1536, className: "w-[15%] translate-y-1" },
];

function FloatingBottle({
  bottle,
  pointerX,
  pointerY,
  scrollProgress,
  reduceMotion,
}: {
  bottle: Bottle;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const x = useTransform(pointerX, (v) => v * bottle.depth * 34);
  const y = useTransform(
    [pointerY, scrollProgress] as MotionValue<number>[],
    ([p, s]: number[]) => p * bottle.depth * 22 - s * bottle.depth * 150,
  );

  const image = (
    <Image
      src={assetPath(bottle.src)}
      alt=""
      width={bottle.width}
      height={bottle.height}
      sizes="184px"
      className="h-auto w-full [filter:drop-shadow(0_26px_26px_rgba(36,26,16,0.2))]"
    />
  );

  if (reduceMotion) {
    return (
      <div
        className={`absolute ${bottle.className}`}
        style={{ transform: `rotate(${bottle.rotate}deg)` }}
      >
        {image}
      </div>
    );
  }

  return (
    <motion.div className={`absolute ${bottle.className}`} style={{ x, y }}>
      <div
        className="bottle-in"
        style={
          {
            "--r": `${bottle.rotate}deg`,
            animationDelay: `${bottle.delay}s`,
          } as React.CSSProperties
        }
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 1.2, 0] }}
          transition={{
            duration: bottle.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {image}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const delay = (seconds: number): React.CSSProperties => ({
    animationDelay: `${seconds}s`,
  });

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden"
    >
      {/* Floating bottles — desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1500px] lg:block"
      >
        {bottles.map((bottle) => (
          <FloatingBottle
            key={bottle.src}
            bottle={bottle}
            pointerX={pointerX}
            pointerY={pointerY}
            scrollProgress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      <div className="container-page relative pb-14 pt-12 text-center sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
        <p className="eyebrow rise text-gold" style={delay(0)}>
          Internal Product Playbook
        </p>

        <h1
          aria-label={TITLE}
          className="mt-6 font-serif text-6xl font-medium leading-[1.05] tracking-tight text-espresso sm:text-7xl lg:text-8xl"
        >
          <span
            aria-hidden="true"
            className="-mb-[0.14em] inline-flex overflow-hidden px-[0.06em] pb-[0.14em]"
          >
            {TITLE.split("").map((letter, index) => (
              <span
                key={index}
                className="letter-in inline-block"
                style={delay(0.12 + index * 0.045)}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>

        <div
          aria-hidden="true"
          style={delay(0.55)}
          className="line-in mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <p
          style={delay(0.6)}
          className="rise mx-auto mt-7 max-w-md font-serif text-2xl italic leading-snug text-bark sm:text-[1.7rem]"
        >
          Premium beauty-care product catalogue.
        </p>

        <p
          style={delay(0.7)}
          className="rise mx-auto mt-4 max-w-lg text-sm leading-relaxed text-bark/75 sm:text-[0.95rem]"
        >
          Ten considered formulations across hair and body — the complete
          Perlaville range in one reference.
        </p>

        <div className="rise mt-12" style={delay(0.82)}>
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
        </div>

        {/* Bottle line-up — phones and tablets */}
        <div
          aria-hidden="true"
          className="mx-auto mt-12 flex max-w-md items-end justify-center gap-[2%] lg:hidden"
        >
          {mobileRow.map((item, index) => (
            <div
              key={item.src}
              className={`rise ${item.className}`}
              style={
                {
                  "--rise-y": "36px",
                  ...delay(0.9 + Math.abs(index - 2) * 0.09),
                } as React.CSSProperties
              }
            >
              <Image
                src={assetPath(item.src)}
                alt=""
                width={item.width}
                height={item.height}
                sizes="90px"
                className="h-auto w-full [filter:drop-shadow(0_14px_14px_rgba(36,26,16,0.18))]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
