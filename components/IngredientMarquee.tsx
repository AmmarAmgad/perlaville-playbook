import { uniqueIngredients } from "@/data/products";
import Reveal from "@/components/Reveal";

export default function IngredientMarquee() {
  const ingredients = uniqueIngredients();

  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {ingredients.map((ingredient) => (
        <li key={ingredient} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-serif text-3xl italic text-bark/80 sm:px-9 sm:text-[2.6rem]">
            {ingredient}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/60"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Key ingredients across the range" className="mt-14 sm:mt-20">
      <Reveal className="container-page">
        <p className="eyebrow flex items-center gap-4 text-gold">
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          {ingredients.length} key actives across the range
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </p>
      </Reveal>
      <div className="marquee-mask mt-8 overflow-hidden py-2 sm:mt-10">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
