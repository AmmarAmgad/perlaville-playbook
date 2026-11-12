import { uniqueIngredients, type Product } from "@/data/products";
import CountUp from "@/components/CountUp";

export default function RangePanel({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) {
  const hair = products.filter((p) => p.category === "Hair Products").length;
  const body = products.length - hair;
  const formatNames = [...new Set(products.map((p) => p.form))];
  const formats = formatNames.length;
  const actives = uniqueIngredients(products).length;

  const split = [hair > 0 && `${hair} hair`, body > 0 && `${body} body`]
    .filter(Boolean)
    .join(" · ");

  const stats = [
    { label: products.length === 1 ? "Product" : "Products", value: products.length },
    { label: "Key actives", value: actives },
    { label: formats === 1 ? "Format" : "Formats", value: formats },
  ];

  return (
    <div className="@container h-full">
      <div className="relative flex h-full flex-col justify-between gap-12 overflow-hidden rounded-lg bg-gradient-to-br from-[#33261a] via-[#2a1f13] to-ink p-8 text-cream shadow-[0_28px_48px_-28px_rgba(36,26,16,0.55)] dark:ring-1 dark:ring-gold-soft/15 @xl:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-gold/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-gold-soft/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rounded-full border border-gold-soft/10"
        />

        <div className="relative">
          <p className="eyebrow text-gold-soft">At a glance</p>
          <p className="mt-4 font-serif text-[2rem] font-medium leading-[1.1] tracking-tight @xl:text-5xl">
            {title}
          </p>
          <div
            aria-hidden="true"
            className="mt-6 h-px w-14 bg-gradient-to-r from-gold-soft to-gold-soft/10"
          />
          <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-cream/55">
            {split}
          </p>
          <ul className="mt-7 flex max-w-xl flex-wrap gap-2">
            {formatNames.map((name) => (
              <li
                key={name}
                className="rounded-full border border-cream/15 bg-cream/[0.04] px-3.5 py-1.5 text-[12px] tracking-wide text-cream/75"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <dl className="relative grid grid-cols-3 gap-5 border-t border-cream/10 pt-7 @xl:gap-10 @xl:pt-9">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-3 text-[10px] uppercase leading-snug tracking-[0.14em] text-cream/55 @xl:tracking-[0.18em]">
                {stat.label}
              </dt>
              <dd className="font-serif text-5xl font-medium leading-none text-gold-soft lining-nums tabular-nums @xl:text-7xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
