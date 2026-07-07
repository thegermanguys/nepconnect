import type { Metadata } from "next";
import { jobs } from "@/lib/data/jobs";
import { JobCard } from "@/components/shared/job-card";
import { cities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Job openings shared by the Nepali community across Germany.",
};

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams;
  const filtered = city ? jobs.filter((j) => j.citySlug === city) : jobs;
  const cityName = cities.find((c) => c.slug === city)?.name;

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Job Board</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {cityName ? `Jobs in ${cityName}` : "Find your next role"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Full-time, part-time, Ausbildung, and working-student roles shared by employers and community members.
        </p>
      </div>
      <div className="mt-10 space-y-4">
        {filtered.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </div>
  );
}
