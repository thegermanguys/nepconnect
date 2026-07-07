import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={event.poster}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4">
          {event.festivalTag && (
            <Badge variant="accent" className="mb-2">{event.festivalTag}</Badge>
          )}
          <h3 className="font-display text-base font-semibold text-white line-clamp-2">{event.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/85">
            <CalendarDays className="h-3 w-3" /> {formatDate(event.startDate)}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/85">
            <MapPin className="h-3 w-3" /> {event.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
