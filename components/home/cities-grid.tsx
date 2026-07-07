import { SectionHeader } from "@/components/shared/section-header";
import { CityCard } from "@/components/shared/city-card";
import { cities } from "@/lib/data/cities";

export function CitiesGrid() {
  return (
    <section className="bg-surface-2/60 py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Nationwide"
          title="Nepali communities across Germany"
          description="120+ cities and growing — tap a city to see every club, business, and event near you."
          href="/cities"
          hrefLabel="View all cities"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.slice(0, 8).map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
