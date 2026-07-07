import { SectionHeader } from "@/components/shared/section-header";
import { CategoryCard } from "@/components/shared/category-card";
import { categories } from "@/lib/data/categories";

const SPORTS_SLUGS = new Set(["cricket", "football", "volleyball", "badminton", "basketball"]);

export function CategoriesGrid() {
  return (
    <section className="container py-20">
      <SectionHeader
        eyebrow="Browse"
        title="Everything a Nepali in Germany needs"
        description="From weekend cricket to visa lawyers — find your people and your places, organised by category."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => {
          const href = SPORTS_SLUGS.has(category.slug)
            ? `/cities/berlin/${category.slug}`
            : `/${category.slug}`;
          return <CategoryCard key={category.id} category={category} href={href} />;
        })}
      </div>
    </section>
  );
}
