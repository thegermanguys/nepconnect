import Link from "next/link";
import { Briefcase, MapPin, Wallet, Clock } from "lucide-react";
import type { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCityBySlug } from "@/lib/data/cities";
import { formatDate } from "@/lib/utils";

export function JobCard({ job }: { job: Job }) {
  const city = getCityBySlug(job.citySlug);
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <Briefcase className="h-6 w-6" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/jobs/${job.slug}`} className="font-display text-lg font-semibold hover:text-primary">
              {job.title}
            </Link>
            {job.isPromoted && <Badge variant="accent">Promoted</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{job.company}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/70">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {city?.name}</span>
            <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5" /> {job.salary}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
            <span>Posted {formatDate(job.postedDate)}</span>
          </div>
        </div>
      </div>
      <Button asChild className="shrink-0">
        <Link href={`/jobs/${job.slug}`}>Apply Now</Link>
      </Button>
    </div>
  );
}
