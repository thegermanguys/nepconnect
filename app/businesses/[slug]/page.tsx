import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Phone, MapPin, Star, Instagram, Facebook, Globe, Clock } from "lucide-react";
import { businesses, groceries, getBusinessBySlug } from "@/lib/data/businesses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return [...businesses, ...groceries].map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBusinessBySlug(slug);
  if (!b) return {};
  return { title: b.name, description: b.description };
}

export default async function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) notFound();

  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-2xl">
            {business.photos.map((photo, i) => (
              <div key={i} className={`relative h-64 ${i === 0 ? "col-span-2" : ""}`}>
                <Image src={photo} alt={`${business.name} photo ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start justify-between gap-4">
            <div>
              {business.isPremium && <Badge variant="accent" className="mb-2">Premium Listing</Badge>}
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">{business.name}</h1>
              <p className="mt-1 text-muted-foreground">{business.category}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium">
              <Star className="h-4 w-4 fill-accent text-accent" /> {business.rating}
              <span className="text-muted-foreground">({business.reviewCount})</span>
            </div>
          </div>

          <Separator className="my-6" />
          <p className="leading-relaxed text-foreground/85">{business.description}</p>

          <Separator className="my-6" />
          <h2 className="font-display text-xl font-semibold">Opening Hours</h2>
          <div className="mt-3 space-y-2">
            {business.openingHours.map((h) => (
              <div key={h.day} className="flex justify-between rounded-lg bg-surface-2 px-4 py-2 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {h.day}</span>
                <span className="font-medium">{h.hours}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-soft lg:sticky lg:top-24">
          <p className="flex items-start gap-3 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {business.address}</p>
          <p className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 shrink-0 text-primary" /> {business.phone}</p>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" asChild>
              <a href={business.mapsUrl} target="_blank" rel="noreferrer">Google Maps</a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={`tel:${business.phone}`} aria-label="Call"><Phone className="h-4 w-4" /></a>
            </Button>
          </div>
          <div className="flex gap-2 pt-1">
            {business.social.instagram && (
              <a href={business.social.instagram} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {business.social.facebook && (
              <a href={business.social.facebook} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {business.social.website && (
              <a href={business.social.website} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 hover:bg-primary hover:text-primary-foreground">
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
