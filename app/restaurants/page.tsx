import type { Metadata } from "next";
import { restaurants } from "@/lib/data/restaurants";
import { BusinessCard } from "@/components/shared/business-card";
import { cities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Nepali Restaurants",
  description: "Momos, dal bhat, and thakali kitchens across Germany.",
};

export default async function RestaurantsPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams;
  const filtered = city ? restaurants.filter((r) => r.citySlug === city) : restaurants;
  const cityName = cities.find((c) => c.slug === city)?.name;

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Food</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {cityName ? `Nepali Restaurants in ${cityName}` : "Nepali Restaurants"}
        </h1>
        <p className="mt-4 text-muted-foreground">A taste of home, from Neukölln to Sendling.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <BusinessCard key={r.id} business={r} basePath="/restaurants" />
        ))}
      </div>
    </div>
  );
}
