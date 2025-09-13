import HomeUI from "@/components/layout/home";
import { getProjects } from "@/lib/supabase-methods";

export const revalidate = 60 * 60 * 24 * 7; // 7 days
export default async function Page() {
  const data = await getProjects(1, 5);

  return (
    <main className="relative min-h-[calc(100vh)]">
      {/* Content */}
      <HomeUI data={data?.data} />
    </main>
  );
}
