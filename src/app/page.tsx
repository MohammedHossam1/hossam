import { getProjects } from "@/lib/supabase-methods";
import { Suspense } from "react";
import Loading from "./loading";
import Hero from "@/components/layout/hero";
import FeaturedProjects from "@/components/layout/projects/featured-projects";
import FeaturedReels from "@/components/layout/videos/featured-videos";
import ExperienceTimeline from "@/components/layout/experience";
export default function Page() {
  const data = getProjects(1, 5);

  return (
    <main className=" min-h-[calc(100vh)] z-1 relative  py-5 lg:py-16 space-y-8">
        {/* Content */}
        <Hero />
        <Suspense fallback={<Loading />}>
          <FeaturedProjects data={data || []} />
        </Suspense>
        <FeaturedReels />
        <ExperienceTimeline />
    </main>
  );
}
