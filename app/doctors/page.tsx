"use client";

import * as React from "react";
import Image from "next/image";
import { Stethoscope, MapPin, Phone } from "lucide-react";
import { doctors } from "@/lib/data/doctors";
import { getCityBySlug } from "@/lib/data/cities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LANGUAGES = ["All", "Nepali", "English", "German", "Hindi"] as const;

export default function DoctorsPage() {
  const [language, setLanguage] = React.useState<(typeof LANGUAGES)[number]>("All");

  const filtered = doctors.filter((d) => language === "All" || d.languages.includes(language as never));

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Services</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Doctors</h1>
        <p className="mt-4 text-muted-foreground">
          Nepali, English, and German-speaking physicians recommended by the community.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              language === lang
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface hover:bg-surface-2"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => {
          const city = getCityBySlug(doc.citySlug);
          return (
            <div key={doc.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image src={doc.photo} alt={doc.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{doc.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Stethoscope className="h-3.5 w-3.5" /> {doc.specialization}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {doc.languages.map((l) => (
                  <Badge key={l} variant="muted">{l}</Badge>
                ))}
              </div>
              <div className="space-y-1.5 text-sm text-foreground/80">
                <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> {doc.address} · {city?.name}</p>
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> {doc.phone}</p>
              </div>
              <Button className="mt-auto" asChild>
                <a href={doc.appointmentUrl} target="_blank" rel="noreferrer">Book Appointment</a>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
