import { SectionHeader } from "@/components/shared/section-header";
import { ClubCard } from "@/components/shared/club-card";
import { featuredClubs } from "@/lib/data/clubs";

export function FeaturedClubsSection() {
  return (
    <section className="container py-20">
      <SectionHeader
        eyebrow="Featured"
        title="Clubs the community is talking about"
        description="Active, welcoming, and easy to join — these clubs are onboarding new members right now."
        href="/cities/berlin/cricket"
        hrefLabel="Browse all clubs"
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </section>
  );
}
