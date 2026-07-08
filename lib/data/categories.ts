import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "cat1", slug: "cricket", name: "Cricket", icon: "Zap", group: "sports", description: "Weekend leagues, tape-ball, and hardball clubs." },
  { id: "cat2", slug: "football", name: "Football", icon: "CircleDot", group: "sports", description: "5-a-side and 11-a-side teams across every city." },
  { id: "cat3", slug: "volleyball", name: "Volleyball", icon: "Activity", group: "sports", description: "Indoor courts and summer beach tournaments." },
  { id: "cat4", slug: "badminton", name: "Badminton", icon: "Feather", group: "sports", description: "Casual and competitive club nights." },
  { id: "cat5", slug: "basketball", name: "Basketball", icon: "CircleDot", group: "sports", description: "Pick-up games and university teams." },
  { id: "cat6", slug: "cultural-organizations", name: "Cultural Organizations", icon: "Landmark", group: "community", description: "Preserving Nepali heritage, language, and art." },
  { id: "cat8", slug: "music-groups", name: "Music Groups", icon: "Music", group: "community", description: "Folk, modern, and devotional music circles." },
  { id: "cat11", slug: "restaurants", name: "Nepali Restaurants", icon: "UtensilsCrossed", group: "food", description: "Momos, dal bhat, and thakali kitchens." },
  { id: "cat17", slug: "events", name: "Events", icon: "CalendarDays", group: "life", description: "Festivals, tournaments, and meetups." },
];

export const sportsCategories = categories.filter((c) => c.group === "sports");
export const communityCategories = categories.filter((c) => c.group === "community");

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
