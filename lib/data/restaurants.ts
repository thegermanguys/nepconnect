import type { Restaurant } from "@/lib/types";

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    slug: "momo-house-berlin",
    name: "Momo House Berlin",
    citySlug: "berlin",
    category: "Restaurant",
    logo: "https://picsum.photos/seed/momohouse-logo/200/200",
    photos: [
      "https://picsum.photos/seed/momohouse-1/900/600",
      "https://picsum.photos/seed/momohouse-2/900/600",
      "https://picsum.photos/seed/momohouse-3/900/600",
    ],
    description: "Steamed, fried, and jhol momos alongside thakali sets — a Neukölln favourite since 2016.",
    openingHours: [
      { day: "Mon–Fri", hours: "12:00 – 22:00" },
      { day: "Sat–Sun", hours: "12:00 – 23:00" },
    ],
    address: "Weserstraße 34, 12045 Berlin",
    mapsUrl: "https://maps.google.com/?q=Weserstrasse+34+Berlin",
    social: { instagram: "https://instagram.com/momohouseberlin", website: "https://momohouse.de" },
    phone: "+49 30 6789 0123",
    rating: 4.9,
    reviewCount: 210,
    isPremium: true,
    status: "approved",
    cuisine: ["Nepali", "Tibetan"],
    menuHighlights: [
      { name: "Steam Momo (10 pcs)", price: "€8.50", description: "Chicken or vegetable, served with achar" },
      { name: "Thakali Khana Set", price: "€14.90", description: "Dal, bhat, tarkari, gundruk, achar" },
      { name: "Chow Mein", price: "€9.50" },
    ],
    delivery: [
      { partner: "Lieferando", url: "https://lieferando.de" },
      { partner: "Wolt", url: "https://wolt.com" },
    ],
  },
  {
    id: "r2",
    slug: "yeti-kitchen-munich",
    name: "Yeti Kitchen",
    citySlug: "munich",
    category: "Restaurant",
    logo: "https://picsum.photos/seed/yetikitchen-logo/200/200",
    photos: ["https://picsum.photos/seed/yetikitchen-1/900/600", "https://picsum.photos/seed/yetikitchen-2/900/600"],
    description: "Family-run Nepali kitchen near the Hauptbahnhof, known for its goat curry.",
    openingHours: [{ day: "Tue–Sun", hours: "12:00 – 22:00" }, { day: "Mon", hours: "Closed" }],
    address: "Schwanthalerstraße 21, 80336 Munich",
    mapsUrl: "https://maps.google.com/?q=Schwanthalerstrasse+21+Munich",
    social: { facebook: "https://facebook.com/yetikitchenmunich" },
    phone: "+49 89 7890 1234",
    rating: 4.7,
    reviewCount: 145,
    status: "approved",
    cuisine: ["Nepali", "Indian"],
    menuHighlights: [
      { name: "Khasi ko Masu (Goat Curry)", price: "€15.90" },
      { name: "Veg Momo (10 pcs)", price: "€7.90" },
    ],
    delivery: [{ partner: "Lieferando", url: "https://lieferando.de" }],
  },
  {
    id: "r3",
    slug: "namaste-frankfurt",
    name: "Namaste Frankfurt",
    citySlug: "frankfurt",
    category: "Restaurant",
    logo: "https://picsum.photos/seed/namastefrankfurt-logo/200/200",
    photos: ["https://picsum.photos/seed/namastefrankfurt-1/900/600"],
    description: "Cosy spot near the Hauptwache serving Nepali comfort food and butter tea.",
    openingHours: [{ day: "Mon–Sun", hours: "11:30 – 21:30" }],
    address: "Zeil 65, 60313 Frankfurt",
    mapsUrl: "https://maps.google.com/?q=Zeil+65+Frankfurt",
    social: { instagram: "https://instagram.com/namastefrankfurt" },
    phone: "+49 69 8901 2345",
    rating: 4.5,
    reviewCount: 96,
    status: "approved",
    cuisine: ["Nepali"],
    menuHighlights: [{ name: "Dal Bhat Set", price: "€13.50" }],
    delivery: [{ partner: "Wolt", url: "https://wolt.com" }],
  },
];

export function getRestaurantsByCity(citySlug: string) {
  return restaurants.filter((r) => r.citySlug === citySlug);
}
export function getRestaurantBySlug(slug: string) {
  return restaurants.find((r) => r.slug === slug);
}
