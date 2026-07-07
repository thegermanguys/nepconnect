import type { Metadata } from "next";
import { Phone, ExternalLink, Siren } from "lucide-react";
import { usefulLinks, emergencyContacts } from "@/lib/data/resources";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Resources for Newcomers",
  description: "Government links, visa resources, embassy information, and emergency contacts for Nepalis in Germany.",
};

const GROUP_LABELS: Record<string, string> = {
  government: "German Government Links",
  embassy: "Embassy Information",
  visa: "Visa Resources",
  transport: "Public Transport Guide",
  student: "Useful Links for New Students",
};

export default function ResourcesPage() {
  const groups = Object.keys(GROUP_LABELS) as (keyof typeof GROUP_LABELS)[];

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Newcomer Resources</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Everything you need to get settled
        </h1>
        <p className="mt-4 text-muted-foreground">
          Official links and emergency numbers every Nepali should bookmark after landing in Germany.
        </p>
      </div>

      <section className="mt-12 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="mb-4 flex items-center gap-2 text-destructive">
          <Siren className="h-5 w-5" />
          <h2 className="font-display text-lg font-semibold">Emergency Contacts</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {emergencyContacts.map((c) => (
            <a key={c.id} href={c.url} className="flex items-center gap-3 rounded-xl bg-surface p-4 shadow-soft">
              <Phone className="h-4 w-4 shrink-0 text-destructive" />
              <div>
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {groups.map((group) => {
        const links = usefulLinks.filter((l) => l.group === group);
        if (links.length === 0) return null;
        return (
          <section key={group} className="mt-14">
            <SectionHeader title={GROUP_LABELS[group]} />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-shadow hover:shadow-lift"
                >
                  <div>
                    <p className="font-display font-semibold">{l.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{l.description}</p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-14">
        <SectionHeader title="More ways to get involved" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {["Volunteer Opportunities", "Success Stories", "Community News"].map((title) => (
            <div key={title} className="rounded-2xl border border-dashed border-border p-6 text-center">
              <Badge variant="muted" className="mb-2">Coming soon</Badge>
              <p className="font-display font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
