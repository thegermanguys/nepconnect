import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Ruler, CalendarClock, Phone, User } from "lucide-react";
import { housingListings, getHousingBySlug } from "@/lib/data/housing";
import { getCityBySlug } from "@/lib/data/cities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return housingListings.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = getHousingBySlug(slug);
  if (!h) return {};
  return { title: h.title, description: h.description };
}

export default async function HousingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = getHousingBySlug(slug);
  if (!listing) notFound();
  const city = getCityBySlug(listing.citySlug);

  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-2xl">
            {listing.photos.map((photo, i) => (
              <div key={i} className={`relative h-64 ${i === 0 ? "col-span-2" : ""}`}>
                <Image src={photo} alt={`${listing.title} photo ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Badge variant="secondary" className="mb-2">{listing.type}</Badge>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{listing.title}</h1>
            <p className="mt-1 text-muted-foreground">{city?.name}, {city?.state}</p>
          </div>
          <p className="mt-6 leading-relaxed text-foreground/85">{listing.description}</p>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-soft lg:sticky lg:top-24">
          <p className="font-display text-3xl font-bold text-primary">
            €{listing.price}
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </p>
          <div className="space-y-2 border-t border-border pt-4 text-sm">
            <p className="flex items-center gap-2"><Ruler className="h-4 w-4 text-primary" /> {listing.sizeSqm} m²</p>
            <p className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" /> Available from {formatDate(listing.availableFrom)}</p>
            <p className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {listing.contactName}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {listing.contactPhone}</p>
          </div>
          <Button className="w-full" asChild>
            <a href={`tel:${listing.contactPhone}`}>Contact Now</a>
          </Button>
        </aside>
      </div>
    </div>
  );
}
