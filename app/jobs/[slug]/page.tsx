import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase, MapPin, Wallet, Clock, CheckCircle2 } from "lucide-react";
import { jobs, getJobBySlug } from "@/lib/data/jobs";
import { getCityBySlug } from "@/lib/data/cities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = getJobBySlug(slug);
  if (!j) return {};
  return { title: `${j.title} at ${j.company}`, description: j.description };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();
  const city = getCityBySlug(job.citySlug);

  return (
    <div className="container max-w-3xl py-14">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <Briefcase className="h-7 w-7" />
          </span>
          <div>
            {job.isPromoted && <Badge variant="accent" className="mb-2">Promoted</Badge>}
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">{job.title}</h1>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-foreground/80">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {city?.name}</span>
          <span className="flex items-center gap-1.5"><Wallet className="h-4 w-4 text-primary" /> {job.salary}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {job.type}{job.remote ? " · Remote-friendly" : ""}</span>
          <span>Posted {formatDate(job.postedDate)}</span>
        </div>

        <p className="mt-6 leading-relaxed text-foreground/85">{job.description}</p>

        <h2 className="mt-6 font-display text-lg font-semibold">Requirements</h2>
        <ul className="mt-3 space-y-2">
          {job.requirements.map((req) => (
            <li key={req} className="flex items-start gap-2 text-sm text-foreground/85">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pine" /> {req}
            </li>
          ))}
        </ul>

        <Button size="lg" className="mt-8 w-full sm:w-auto" asChild>
          <a href={job.applyUrl} target="_blank" rel="noreferrer">Apply Now</a>
        </Button>
      </div>
    </div>
  );
}
