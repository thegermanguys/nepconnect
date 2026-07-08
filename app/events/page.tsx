import type { Metadata } from "next";
import { events } from "@/lib/data/events";
import { EventCard } from "@/components/shared/event-card";
import { cities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Events",
  description: "Festivals, tournaments, and meetups happening across Germany.",
};

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams;
  const filtered = city ? events.filter((e) => e.citySlug === city) : events;
  const sorted = [...filtered].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const cityName = cities.find((c) => c.slug === city)?.name;

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Calendar</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {cityName ? `Events in ${cityName}` : "What's happening"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Dashain melas, cricket finals, career nights, and more — never miss what matters to the community.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sorted.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}
