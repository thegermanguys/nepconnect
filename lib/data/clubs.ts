import type { Club } from "@/lib/types";

export const clubs: Club[] = [
  {
    id: "cl1",
    slug: "nrcc-berlin",
    name: "Nepali Rhinos Cricket Club (NRCC) Berlin",
    citySlug: "berlin",
    categorySlug: "cricket",
    logo: "https://picsum.photos/seed/gorkha-cc-logo/200/200",
    coverImage: "https://picsum.photos/seed/gorkha-cc-cover/1200/600",
    description:
      "Berlin's oldest Nepali cricket club, founded in 2020. We play hard tennis ball and compete in different Cricket Leagues.",
    social: {
      instagram: "https://www.instagram.com/nrccberlin/",
      facebook: "https://www.facebook.com/NRCCBerlin",
      whatsapp: "https://chat.whatsapp.com/KlpNaOPNahn0PWoTzG9SYN",
    },
    captainName: "Awanish Srivastava",
    phone: "+49 ",
    email: "nrccberlin@gmail.com",
    practiceLocation: "Tempelhofer Feld, Berlin",
    practiceTime: "Sundays, 09:00 – 13:00",
    mapsUrl: "https://maps.google.com/?q=Tempelhofer+Feld+Berlin",
    memberCount: 34,
    isFeatured: true,
    status: "approved",
  },
  {
    id: "cl2",
    slug: "munich-yeti-football-club",
    name: "Munich Yeti Football Club",
    citySlug: "munich",
    categorySlug: "football",
    logo: "https://picsum.photos/seed/yeti-fc-logo/200/200",
    coverImage: "https://picsum.photos/seed/yeti-fc-cover/1200/600",
    description:
      "A 5-a-side football club for Nepali students and workers in Munich. All skill levels welcome — we play every Wednesday evening.",
    social: {
      instagram: "https://instagram.com/munichyetifc",
      whatsapp: "https://wa.me/491234567891",
    },
    captainName: "Suman Gurung",
    phone: "+49 89 1234 5678",
    email: "contact@munichyetifc.de",
    practiceLocation: "Olympiapark Sportforum, Munich",
    practiceTime: "Wednesdays, 19:00 – 21:00",
    mapsUrl: "https://maps.google.com/?q=Olympiapark+Sportforum+Munich",
    memberCount: 28,
    isFeatured: true,
    status: "approved",
  },
  {
    id: "cl3",
    slug: "frankfurt-himal-cricket-club",
    name: "Frankfurt Himal Cricket Club",
    citySlug: "frankfurt",
    categorySlug: "cricket",
    logo: "https://picsum.photos/seed/himal-cc-logo/200/200",
    coverImage: "https://picsum.photos/seed/himal-cc-cover/1200/600",
    description:
      "Competitive hardball cricket club representing Frankfurt in the Hesse Cricket League.",
    social: { facebook: "https://facebook.com/frankfurthimalcc" },
    captainName: "Kiran Adhikari",
    phone: "+49 69 1234 5678",
    email: "info@himalcc.de",
    practiceLocation: "Bornheimer Hang, Frankfurt",
    practiceTime: "Saturdays, 14:00 – 17:00",
    mapsUrl: "https://maps.google.com/?q=Bornheimer+Hang+Frankfurt",
    memberCount: 22,
    status: "approved",
  },
  {
    id: "cl4",
    slug: "stuttgart-spike-volleyball-club",
    name: "Stuttgart Spike Volleyball Club",
    citySlug: "stuttgart",
    categorySlug: "volleyball",
    logo: "https://picsum.photos/seed/spike-vc-logo/200/200",
    coverImage: "https://picsum.photos/seed/spike-vc-cover/1200/600",
    description:
      "Indoor volleyball every Friday plus a summer beach-volleyball tournament with neighbouring cities.",
    social: { instagram: "https://instagram.com/stuttgartspikevc" },
    captainName: "Anisha Rai",
    phone: "+49 711 123 4567",
    email: "spike@stuttgartvc.de",
    practiceLocation: "Sporthalle Bad Cannstatt, Stuttgart",
    practiceTime: "Fridays, 18:30 – 20:30",
    mapsUrl: "https://maps.google.com/?q=Sporthalle+Bad+Cannstatt",
    memberCount: 19,
    status: "approved",
  },
  {
    id: "cl5",
    slug: "dusseldorf-shuttle-badminton-club",
    name: "Düsseldorf Shuttle Badminton Club",
    citySlug: "dusseldorf",
    categorySlug: "badminton",
    logo: "https://picsum.photos/seed/shuttle-bc-logo/200/200",
    coverImage: "https://picsum.photos/seed/shuttle-bc-cover/1200/600",
    description:
      "Casual and competitive badminton sessions, open to all Nepalis in the Rhineland.",
    social: { whatsapp: "https://wa.me/491234567892" },
    captainName: "Prakash Karki",
    phone: "+49 211 123 4567",
    email: "shuttle@dusseldorfbc.de",
    practiceLocation: "Sporthalle Flingern, Düsseldorf",
    practiceTime: "Tuesdays, 19:00 – 21:00",
    mapsUrl: "https://maps.google.com/?q=Sporthalle+Flingern",
    memberCount: 16,
    status: "approved",
  },
  {
    id: "cl6",
    slug: "nsnrw-cricket-club",
    name: "Nepalese Stars NRW Cricket Team",
    citySlug: "cologne",
    categorySlug: "cricket",
    logo: "https://picsum.photos/seed/rhine-cc-logo/200/200",
    coverImage: "https://picsum.photos/seed/rhine-cc-cover/1200/600",
    description: "Friendly Tennis-ball cricket every other Sunday along the Rhine.",
    social: { facebook: "https://www.facebook.com/nsnrwct" },
    captainName: "Sagar Basnet",
    phone: "015739592492",
    email: "rhinecc@cologne.de",
    practiceLocation: "Poller Wiesen, Cologne",
    practiceTime: "Alternate Sundays, 11:00 – 14:00",
    mapsUrl: "https://maps.google.com/?q=Poller+Wiesen+Cologne",
    memberCount: 20,
    status: "approved",
  },
];

export function getClubsByCity(citySlug: string) {
  return clubs.filter((c) => c.citySlug === citySlug);
}

export function getClubsByCityAndCategory(citySlug: string, categorySlug: string) {
  return clubs.filter((c) => c.citySlug === citySlug && c.categorySlug === categorySlug);
}

export function getClubBySlug(slug: string) {
  return clubs.find((c) => c.slug === slug);
}

export const featuredClubs = clubs.filter((c) => c.isFeatured);
