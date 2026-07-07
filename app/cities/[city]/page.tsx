import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Users, Building2, CalendarDays, GraduationCap } from "lucide-react";
import { cities, getCityBySlug } from "@/lib/data/cities";
import { getClubsByCity } from "@/lib/data/clubs";
import { getBusinessesByCity, getGroceriesByCity } from "@/lib/data/businesses";
import { getRestaurantsByCity } from "@/lib/data/restaurants";
import { getEventsByCity } from "@/lib/data/events";
import { getJobsByCity } from "@/lib/data/jobs";
import { getHousingByCity } from "@/lib/data/housing";
import { getDoctorsByCity } from "@/lib/data/doctors";
import { getLawyersByCity } from "@/lib/data/lawyers";
import { getUniversitiesByCity } from "@/lib/data/universities";
import { sportsCategories } from "@/lib/data/categories";
import { SectionHeader } from "@/components/shared/section-header";
import { ClubCard } from "@/components/shared/club-card";
import { BusinessCard } from "@/components/shared/business-card";
import { EventCard } from "@/components/shared/event-card";
import { JobCard } from "@/components/shared/job-card";
import { HousingCard } from "@/components/shared/housing-card";
import { CategoryCard } from "@/components/shared/category-card";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Nepalis in ${city.name}`,
    description: city.blurb,
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const clubList = getClubsByCity(city.slug);
  const businessList = getBusinessesByCity(city.slug);
  const groceryList = getGroceriesByCity(city.slug);
  const restaurantList = getRestaurantsByCity(city.slug);
  const eventList = getEventsByCity(city.slug);
  const jobList = getJobsByCity(city.slug);
  const housingList = getHousingByCity(city.slug);
  const doctorList = getDoctorsByCity(city.slug);
  const lawyerList = getLawyersByCity(city.slug);
  const universityList = getUniversitiesByCity(city.slug);

  return (
    <div>
      <section className="relative h-72 w-full overflow-hidden sm:h-96">
        <Image src={city.heroImage} alt={city.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/20" />
        <div className="container relative flex h-full flex-col justify-end pb-10">
          <Badge variant="outline" className="mb-3 w-fit bg-surface/80">{city.state}</Badge>
          <h1 className="font-display text-4xl font-semibold sm:text-6xl">{city.name}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{city.blurb}</p>
        </div>
      </section>

      <section className="container -mt-8 relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: Users, value: city.communityCount, label: "Communities" },
          { icon: Building2, value: city.businessCount, label: "Businesses" },
          { icon: CalendarDays, value: city.eventCount, label: "Events" },
          { icon: GraduationCap, value: universityList.length, label: "Universities" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-5 text-center shadow-soft">
            <s.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="container py-16">
        <SectionHeader eyebrow="Sports" title={`Sports clubs in ${city.name}`} />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {sportsCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} href={`/cities/${city.slug}/${cat.slug}`} />
          ))}
        </div>
        {clubList.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubList.map((club) => <ClubCard key={club.id} club={club} />)}
          </div>
        )}
      </section>

      {universityList.length > 0 && (
        <section className="container pb-16">
          <SectionHeader eyebrow="Students" title="Universities & student associations" href={`/universities?city=${city.slug}`} />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {universityList.map((u) => (
              <Link key={u.id} href={`/universities/${u.slug}`} className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-shadow hover:shadow-lift">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={u.logo} alt={u.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-display font-semibold">{u.name}</p>
                  <p className="text-sm text-muted-foreground">{u.studentAssociationName}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {restaurantList.length > 0 && (
        <section className="bg-surface-2/60 py-16">
          <div className="container">
            <SectionHeader eyebrow="Food" title={`Nepali restaurants in ${city.name}`} href="/restaurants" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurantList.map((r) => <BusinessCard key={r.id} business={r} basePath="/restaurants" />)}
            </div>
          </div>
        </section>
      )}

      {(businessList.length > 0 || groceryList.length > 0) && (
        <section className="container py-16">
          <SectionHeader eyebrow="Businesses & groceries" title={`Trusted businesses in ${city.name}`} href="/businesses" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...businessList, ...groceryList].map((b) => <BusinessCard key={b.id} business={b} />)}
          </div>
        </section>
      )}

      {jobList.length > 0 && (
        <section className="bg-surface-2/60 py-16">
          <div className="container">
            <SectionHeader eyebrow="Jobs" title={`Openings shared in ${city.name}`} href="/jobs" />
            <div className="mt-8 space-y-4">
              {jobList.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          </div>
        </section>
      )}

      {housingList.length > 0 && (
        <section className="container py-16">
          <SectionHeader eyebrow="Housing" title={`Rooms & flats in ${city.name}`} href="/housing" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {housingList.map((h) => <HousingCard key={h.id} listing={h} />)}
          </div>
        </section>
      )}

      {eventList.length > 0 && (
        <section className="bg-surface-2/60 py-16">
          <div className="container">
            <SectionHeader eyebrow="Events" title={`What's happening in ${city.name}`} href="/events" />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {eventList.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </div>
        </section>
      )}

      {(doctorList.length > 0 || lawyerList.length > 0) && (
        <section className="container py-16">
          <SectionHeader eyebrow="Services" title="Doctors & lawyers" />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold">Doctors</h3>
              <div className="space-y-3">
                {doctorList.map((d) => (
                  <div key={d.id} className="rounded-xl border border-border bg-surface p-4">
                    <p className="font-medium">{d.name}</p>
                    <p className="text-sm text-muted-foreground">{d.specialization} · {d.languages.join(", ")}</p>
                  </div>
                ))}
                {doctorList.length === 0 && <p className="text-sm text-muted-foreground">No doctors listed yet.</p>}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold">Lawyers</h3>
              <div className="space-y-3">
                {lawyerList.map((l) => (
                  <div key={l.id} className="rounded-xl border border-border bg-surface p-4">
                    <p className="font-medium">{l.name}</p>
                    <p className="text-sm text-muted-foreground">{l.practiceAreas.join(", ")}</p>
                  </div>
                ))}
                {lawyerList.length === 0 && <p className="text-sm text-muted-foreground">No lawyers listed yet.</p>}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
