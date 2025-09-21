import HomeUI from "@/components/layout/home";
import { getProjects } from "@/lib/supabase-methods";

export default async function Page() {
  const data = await getProjects(1, 5);

  return (
    <main className="relative min-h-[calc(100vh)] z-1">
      {/* Content */}
      <HomeUI data={data?.data} />
    </main>
  );
}
