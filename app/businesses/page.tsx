import type { Metadata } from "next";
import { businesses, groceries } from "@/lib/data/businesses";
import { BusinessCard } from "@/components/shared/business-card";
import { cities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Business Directory",
  description: "Nepali-run and Nepali-friendly businesses across Germany.",
};

export default async function BusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city } = await searchParams;
  const all = [...businesses, ...groceries];
  const filtered = city ? all.filter((b) => b.citySlug === city) : all;
  const cityName = cities.find((c) => c.slug === city)?.name;

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Directory</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {cityName ? `Businesses in ${cityName}` : "Business Directory"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Consultancies, remittance services, grocery stores, and more — vetted and reviewed by the community.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
    </div>
  );
}
