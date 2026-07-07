import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import { universities } from "@/lib/data/universities";
import { getCityBySlug } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Universities",
  description: "Nepali student associations at universities across Germany.",
};

export default async function UniversitiesPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams;
  const filtered = city ? universities.filter((u) => u.citySlug === city) : universities;

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Students</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Universities</h1>
        <p className="mt-4 text-muted-foreground">
          Find your university's Nepali student association, plus nearby restaurants, groceries, and housing.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => {
          const city = getCityBySlug(u.citySlug);
          return (
            <Link
              key={u.id}
              href={`/universities/${u.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={u.logo} alt={u.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-semibold leading-snug">{u.name}</h3>
                  <p className="text-sm text-muted-foreground">{city?.name}</p>
                </div>
              </div>
              {u.studentAssociationName && (
                <p className="flex items-center gap-2 text-sm text-foreground/80">
                  <GraduationCap className="h-4 w-4 text-primary" /> {u.studentAssociationName}
                </p>
              )}
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
