import type { EventItem } from "@/lib/types";

export const events: EventItem[] = [
  {
    id: "e1",
    slug: "chandra-surya",
    title: "Chandra Surya Cup 2.0",
    citySlug: "soest",
    organizer: "Nepalese Stars NRW Cricket Team",
    poster: "/images/chandra-surya.png",
    location: "Geschwister-scholl-straße 1-2, 59494 Soest",
    mapsUrl: "https://maps.app.goo.gl/NuiZwE14TR4Vxsyo7",
    startDate: "2026-07-19",
    endDate: "2026-07-19",
    description: "The Chandra Surya Cup rise again in Soest — battle of 8 cricket teams from Germany.",
    category: "sports",
    festivalTag: "Cricket",
    price: "0",
    registerUrl: "https://www.facebook.com/profile.php?id=61587741186201",
    isFeatured: true,
    status: "approved",
    category: "festival",
    registerUrl: ""
  },
  {
    id: "e2",
    slug: "nrna-football-26",
    title: "9th NRNA Cup Stuttgart 2026",
    citySlug: "stuttgart",
    organizer: "NFC Stuttgart",
    poster: "/images/nrna-football-2026.jpg",
    location: "SV Leonberg/Eltingen e.V.",
    mapsUrl: "https://maps.app.goo.gl/CCqaNNVbfYSaitsT7",
    startDate: "2026-09-05",
    endDate: "2026-09-05",
    description: "A symbol of unity. A passion for football.",
    category: "sports",
    festivalTag: "Football",
    price: "0",
    registerUrl: "https://www.facebook.com/nfcstuttgart",
    isFeatured: true,
    status: "approved",
  },

   {
    id: "e3",
    slug: "berlin-teej-celebration",
    title: "Teej Celebration 2026",
    citySlug: "berlin",
    organizer: "INAS Germany",
    poster: "/images/inas-teej-26.jpg",
    location: "Immanuelkirchstraße 1A, 10405 Berlin-Bezirk Pankow",
    mapsUrl: "https://maps.app.goo.gl/vppRPCVrpnjzpqH27",
    startDate: "2026-09-12",
    description: "Traditional dance, dar khane, and fasting-day rituals celebrated together.",
    category: "religious",
    festivalTag: "Teej",
    price: "€",
    registerUrl: "",
    status: "approved",
  }, 
  {
    id: "e4",
    slug: "gtct-2026",
    title: "Gänseliesel TCT 2026 - Tennis Cricket Tournament",
    citySlug: "göttingen",
    organizer: "Goettingen Nepalese Society Cricket Club - GNSCC",
    poster: "/images/gtct-banner.jpeg",
    location: "Göttingen Uni Sportzentrum",
    mapsUrl: "https://maps.app.goo.gl/kifuDSjJWqoyopTCA",
    startDate: "2026-08-15",
    description: "Gänseliesel TCT 2026 is coming on 15 August 2026.",
    category: "sports",
    festivalTag: "Cricket",
    price: "Free",
    registerUrl: "https://www.facebook.com/profile.php?id=61587741186201",
    status: "approved",
  },
  /*{
    id: "e4",
    slug: "berlin-cricket-premier-league-final",
    title: "Berlin Cricket Premier League — Final",
    citySlug: "berlin",
    organizer: "Berlin Nepali Cricket Federation",
    poster: "https://picsum.photos/seed/cricket-final-berlin/900/1200",
    location: "Tempelhofer Feld, Berlin",
    mapsUrl: "https://maps.google.com/?q=Tempelhofer+Feld",
    startDate: "2026-08-30",
    description: "Season finale between six clubs — trophy presentation and community bhoj afterwards.",
    category: "sports",
    price: "Free entry",
    registerUrl: "https://example.com/register/bcpl-final",
    status: "approved",
  },
  {
    id: "e5",
    slug: "cologne-career-networking-night",
    title: "Cologne Nepali Career Networking Night",
    citySlug: "cologne",
    organizer: "Nepali Professionals Network Germany",
    poster: "https://picsum.photos/seed/career-cologne/900/1200",
    location: "IHK Köln, Cologne",
    mapsUrl: "https://maps.google.com/?q=IHK+Koeln",
    startDate: "2026-09-05",
    description: "Meet Nepali professionals across engineering, IT, and finance in the Rhineland.",
    category: "networking",
    price: "€5",
    registerUrl: "https://example.com/register/career-cologne",
    status: "approved",
  }, */
];

export function getEventsByCity(citySlug: string) {
  return events.filter((e) => e.citySlug === citySlug);
}
export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
export const featuredEvents = events.filter((e) => e.isFeatured);
export const festivalEvents = events.filter((e) => e.festivalTag);

export function isPastEvent(event: EventItem, now: Date = new Date()): boolean {
  const referenceDate = new Date(event.endDate ?? event.startDate);
  // Compare by end-of-day so an event still counts as "upcoming" for its whole day.
  referenceDate.setHours(23, 59, 59, 999);
  return referenceDate.getTime() < now.getTime();
}

export function getUpcomingEvents(list: EventItem[] = events, now: Date = new Date()): EventItem[] {
  return list
    .filter((e) => !isPastEvent(e, now))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function getPastEvents(list: EventItem[] = events, now: Date = new Date()): EventItem[] {
  return list
    .filter((e) => isPastEvent(e, now))
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}