import NotFound from "@/app/not-found";
import ProjectDetails from "@/components/layout/projects/project-datails";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/supabase-methods";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        return {
            title: "Project Not Found | Mohammed Hossam",
            description: "المشروع غير موجود",
        };
    }

    return {
        title: `${project.name} | Mohammed Hossam`,
        description: project.description.slice(0, 150),
        openGraph: {
            title: project.name,
            description: project.description,
            url: `https://mohammedhossam.site/projects/${project.slug}`,
            images: [{ url: project.url, width: 1200, height: 630, alt: project.name }],
            siteName: "Mohammed Hossam Portfolio",
        },
        twitter: {
            card: "summary_large_image",
            title: project.name,
            description: project.description,
            images: [project.url],
        },
    };
}
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
