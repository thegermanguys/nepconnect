"use client";

import * as React from "react";
import Image from "next/image";
import { Scale, MapPin, Phone } from "lucide-react";
import { lawyers } from "@/lib/data/lawyers";
import { getCityBySlug } from "@/lib/data/cities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AREAS = ["All", "Immigration", "Civil", "Criminal", "Family", "Corporate"] as const;

export default function LawyersPage() {
  const [area, setArea] = React.useState<(typeof AREAS)[number]>("All");

  const filtered = lawyers.filter((l) => area === "All" || l.practiceAreas.includes(area as never));

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Services</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Lawyers</h1>
        <p className="mt-4 text-muted-foreground">
          Immigration, family, and corporate lawyers who understand the Nepali community's needs.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {AREAS.map((a) => (
          <button
            key={a}
            onClick={() => setArea(a)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              area === a
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface hover:bg-surface-2"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((law) => {
          const city = getCityBySlug(law.citySlug);
          return (
            <div key={law.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image src={law.photo} alt={law.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{law.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Scale className="h-3.5 w-3.5" /> {law.practiceAreas.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {law.languages.map((l) => (
                  <Badge key={l} variant="muted">{l}</Badge>
                ))}
              </div>
              <div className="space-y-1.5 text-sm text-foreground/80">
                <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> {law.address} · {city?.name}</p>
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> {law.phone}</p>
              </div>
              <Button className="mt-auto" asChild>
                <a href={law.mapsUrl} target="_blank" rel="noreferrer">View on Maps</a>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
