// app/page.tsx
import ExperienceTimeline from "@/components/layout/experience";
import Hero from "@/components/layout/hero";
import FeaturedProjects from "@/components/layout/projects/featured-projects";
import { getProjects } from "@/lib/supabase-methods";

export default async  function Page() {
  const data = await getProjects(1, 5);
  return (
    <main className="relative min-h-[calc(100vh-2rem)]">
      {/* Content */}
      <div className="relative z-2 py-5 lg:py-16 space-y-8">
        <Hero />
        <FeaturedProjects data={data?.data} />
        <ExperienceTimeline />
      </div>
    </main>
  );
}
