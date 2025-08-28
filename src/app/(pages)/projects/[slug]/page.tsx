import NotFound from "@/app/not-found";
import ProjectDetails from "@/components/layout/projects/project-datails";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/supabase-methods";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const data = await getProjectBySlug(slug);
    if (!data) return <NotFound />;

    const allSlugs = await getAllProjectSlugs();
    const currentIndex = allSlugs.indexOf(slug);

    // prev & next
    const prev = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
    const next = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
    return <ProjectDetails data={data} slug={slug} prev={prev} next={next} />;
}
