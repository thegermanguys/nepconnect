import type { MetadataRoute } from "next";
import { cities } from "@/lib/data/cities";
import { restaurants } from "@/lib/data/restaurants";
import { events } from "@/lib/data/events";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/cities",
    "/restaurants",
    "/events",
    "/map",
    "/search",
    "/submit",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const cityRoutes = cities.map((c) => ({ url: `${siteUrl}/cities/${c.slug}`, lastModified: new Date() }));
  const restaurantRoutes = restaurants.map((r) => ({ url: `${siteUrl}/restaurants/${r.slug}`, lastModified: new Date() }));
  const eventRoutes = events.map((e) => ({ url: `${siteUrl}/events/${e.slug}`, lastModified: new Date() }));

  return [...staticRoutes, ...cityRoutes, ...restaurantRoutes, ...eventRoutes];
}
