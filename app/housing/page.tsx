import type { Metadata } from "next";
import { housingListings } from "@/lib/data/housing";
import { HousingCard } from "@/components/shared/housing-card";
import { cities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Housing",
  description: "Rooms, apartments, and temporary accommodation shared by the Nepali community in Germany.",
};

export default async function HousingPage({ searchParams }: { searchParams: Promise<{ city?: string; type?: string }> }) {
  const { city, type } = await searchParams;
  let filtered = housingListings;
  if (city) filtered = filtered.filter((h) => h.citySlug === city);
  if (type) filtered = filtered.filter((h) => h.type === type);
  const cityName = cities.find((c) => c.slug === city)?.name;

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Housing</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {cityName ? `Housing in ${cityName}` : "Rooms & flats"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Room listings, apartments, and short-term stays for newcomers — shared directly by the community.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h) => (
          <HousingCard key={h.id} listing={h} />
        ))}
      </div>
    </div>
  );
}
