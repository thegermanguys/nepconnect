import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Mail, GraduationCap } from "lucide-react";
import { universities, getUniversityBySlug } from "@/lib/data/universities";
import { getCityBySlug } from "@/lib/data/cities";
import { restaurants } from "@/lib/data/restaurants";
import { groceries } from "@/lib/data/businesses";
import { housingListings } from "@/lib/data/housing";
import { clubs } from "@/lib/data/clubs";
import { BusinessCard } from "@/components/shared/business-card";
import { HousingCard } from "@/components/shared/housing-card";
import { ClubCard } from "@/components/shared/club-card";
import { SectionHeader } from "@/components/shared/section-header";

export function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniversityBySlug(slug);
  if (!u) return {};
  return { title: u.name };
}

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);
  if (!university) notFound();
  const city = getCityBySlug(university.citySlug);

  const nearbyRestaurants = restaurants.filter((r) => university.nearbyRestaurantSlugs.includes(r.slug));
  const nearbyGroceries = groceries.filter((g) => university.nearbyGrocerySlugs.includes(g.slug));
  const nearbyHousing = housingListings.filter((h) => university.nearbyHousingSlugs.includes(h.slug));
  const nearbyClubs = clubs.filter((c) => university.nearbyClubSlugs.includes(c.slug));

  return (
    <div className="container py-14">
      <div className="flex items-center gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border">
          <Image src={university.logo} alt={university.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{university.name}</h1>
          <p className="text-muted-foreground">{city?.name}, {city?.state}</p>
        </div>
      </div>

      {university.studentAssociationName && (
        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display font-semibold">{university.studentAssociationName}</p>
            {university.studentAssociationContact && (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> {university.studentAssociationContact}
              </p>
            )}
          </div>
        </div>
      )}

      {nearbyClubs.length > 0 && (
        <section className="mt-14">
          <SectionHeader title="Nearby sports clubs" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyClubs.map((c) => <ClubCard key={c.id} club={c} />)}
          </div>
        </section>
      )}

      {(nearbyRestaurants.length > 0 || nearbyGroceries.length > 0) && (
        <section className="mt-14">
          <SectionHeader title="Nearby food & groceries" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...nearbyRestaurants, ...nearbyGroceries].map((b) => <BusinessCard key={b.id} business={b} basePath={"cuisine" in b ? "/restaurants" : "/businesses"} />)}
          </div>
        </section>
      )}

      {nearbyHousing.length > 0 && (
        <section className="mt-14 mb-4">
          <SectionHeader title="Nearby housing" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyHousing.map((h) => <HousingCard key={h.id} listing={h} />)}
          </div>
        </section>
      )}

      {nearbyClubs.length === 0 && nearbyRestaurants.length === 0 && nearbyGroceries.length === 0 && nearbyHousing.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">
          No nearby resources listed yet for this university — be the first to submit one.
        </p>
      )}
    </div>
  );
}
