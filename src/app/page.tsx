// app/page.tsx
import ExperienceTimeline from "@/components/experience";
import Hero from "@/components/layout/hero";

export default function Page() {
  return (
    <main className="relative min-h-[calc(100vh-2rem)]">
      {/* Content */}
      <div className="relative z-10 py-5 lg:py-16">
        <Hero />
        <ExperienceTimeline  />
        </div>
    </main>
  );
}
