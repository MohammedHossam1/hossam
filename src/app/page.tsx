import { getPosts, getProjects } from "@/lib/supabase-methods";
import { Suspense } from "react";
import Loading from "./loading";
import Hero from "@/components/layout/hero/hero";
import FeaturedProjects from "@/components/layout/projects/featured-projects";
import FeaturedReels from "@/components/layout/videos/featured-videos";
import ExperienceTimeline from "@/components/layout/experience";
import FeaturedPosts from "@/components/layout/posts/featured-posts";
import ProjectCardSkeleton from "@/components/layout/projects/project-skelton";
import SectionHeader from "@/components/shared/section-header";

export default function Page() {
  const data = getProjects(1, 5);
  const posts = getPosts(1, 5);

  return (
    <main className=" min-h-[calc(100vh)] z-1 relative  py-5 lg:py-16 space-y-8">
      {/* Content */}
      <Hero />
      <SectionHeader title="Featured Projects" seeAllLink="/projects" />
      <Suspense fallback={<ProjectCardSkeleton />}>
        <FeaturedProjects data={data || []} />
      </Suspense>
      <FeaturedReels />
      <Suspense fallback={<Loading small />}>
        <FeaturedPosts data={posts || []} />
      </Suspense>
      <ExperienceTimeline />
    </main>
  );
}
