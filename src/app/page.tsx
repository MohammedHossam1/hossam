// app/page.tsx
import ExperienceTimeline from "@/components/experience";
import Hero from "@/components/layout/hero";
import FeaturedProjects from "@/components/projects/featured-projects";

export default function Page() {
  return (
    <main className="relative min-h-[calc(100vh-2rem)]">
      {/* Content */}
      <div className="relative z-10 py-5 lg:py-16 space-y-10 lg:space-y-16">
        <Hero />
        <FeaturedProjects />
        <ExperienceTimeline />
      </div>
    </main>
  );
}
