import { StatCard } from "@/components/shared/stat-card";
import { platformStats } from "@/lib/data/cities";

export function StatsSection() {
  const items = [
    { value: `${platformStats.cities}+`, label: "Cities" },
    { value: `${platformStats.communities}+`, label: "Communities" },
    { value: `${platformStats.sportsClubs}+`, label: "Sports Clubs" },
    { value: `${platformStats.businesses}+`, label: "Businesses" },
    { value: `${platformStats.members}+`, label: "Members" },
  ];

  return (
    <section className="container -mt-10 relative z-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item, i) => (
          <StatCard key={item.label} value={item.value} label={item.label} index={i} />
        ))}
      </div>
    </section>
  );
}
