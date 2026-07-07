import Image from "next/image";
import Link from "next/link";
import { Ruler, CalendarClock } from "lucide-react";
import type { Housing } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { getCityBySlug } from "@/lib/data/cities";
import { formatDate } from "@/lib/utils";

export function HousingCard({ listing }: { listing: Housing }) {
  const city = getCityBySlug(listing.citySlug);
  return (
    <Link
      href={`/housing/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative h-44 w-full">
        <Image src={listing.photos[0]} alt={listing.title} fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Badge variant="secondary" className="absolute left-3 top-3">{listing.type}</Badge>
        {listing.isPromoted && <Badge variant="accent" className="absolute right-3 top-3">Promoted</Badge>}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg font-semibold line-clamp-1">{listing.title}</h3>
        <p className="text-sm text-muted-foreground">{city?.name}, {city?.state}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-bold text-primary">
            €{listing.price}
            <span className="text-xs font-normal text-muted-foreground">/mo</span>
          </span>
          <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> {listing.sizeSqm} m²</span>
            <span className="flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> From {formatDate(listing.availableFrom)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
