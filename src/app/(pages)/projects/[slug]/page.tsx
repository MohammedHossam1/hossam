"use client";
import { CustomCarousel } from "@/components/shared/custom-carousel";
import { useGetProjectBySlug } from "@/hooks";
import { ChevronLeft, ExternalLink, Github, LinkIcon, Tags } from "lucide-react";
import Link from "next/link";
import { use, useMemo } from "react";

// --- Types ---
export type IProject = {
    id: string;
    slug: string;
    name: string;
    url: string; // cover image
    images: string[];
    description: string;
    skills: string[];
    code: string; // github url
    demo: string; // live url
};



// Put this file at: app/projects/[slug]/page.tsx (App Router)
export default function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    // NOTE: Using client component here for simplicity. If you want SSR, move loader to server.
    const { slug } = use(params);
    const { data, isLoading, isError }: any = useGetProjectBySlug(slug);

    const breadCrumbs = useMemo(
        () => (
            <nav className="text-sm text-text/70 mb-6 flex items-center gap-2">
                <Link href="/projects" className="hover:text-white flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" /> Back to Projects
                </Link>
                <span className="mx-1">/</span>
                <span className="capitalize text-text">{data?.slug ?? slug}</span>
            </nav>
        ),
        [data?.slug, slug]
    );

    if (isLoading) {
        return (
            <section className="min-h-[100dvh] flex items-center justify-center">
                <div className="animate-pulse grid gap-6 w-full max-w-6xl px-4">
                    <div className="h-64  bg-dark-2" />
                    <div className="h-6 w-1/2 rounded bg-dark-2" />
                    <div className="h-4 w-3/4 rounded bg-dark-2" />
                    <div className="h-4 w-2/3 rounded bg-dark-2" />
                </div>
            </section>
        );
    }

    if (isError || !data) {
        console.log(data, "p");
        return (
            <section className="min-h-[100dvh] flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-lg text-text/80">{isError ?? "Project not found"}</p>
                    <Link href="/projects" className="mt-4 inline-flex items-center gap-2 text-main hover:opacity-90">
                        <ChevronLeft className="w-4 h-4" /> Back to Projects
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-10 lg:py-12 relative">
            <div className="container mx-auto max-w-6xl px-4">
                {breadCrumbs}

                {/* Header */}
                <header className="mb-6 lg:mb-8">
                    <h1 className="text-2xl lg:text-3xl font-semibold text-white">{data.name}</h1>
                    <p className="mt-2 text-text/80 max-w-3xl">{data.description}</p>

                    {/* Links */}
                    <div className="mt-4 flex flex-wrap gap-3">
                        {data.demo && (
                            <Link
                                href={data.demo}
                                target="_blank"
                                className="inline-flex items-center gap-2  bg-main/90 hover:bg-main px-4 py-2 text-black shadow"
                            >
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </Link>
                        )}
                        {data.code && (
                            <Link
                                href={data.code}
                                target="_blank"
                                className="inline-flex items-center gap-2  bg-dark-2 hover:bg-dark-1 px-4 py-2 text-white border border-dark-3"
                            >
                                <Github className="w-4 h-4" /> View Code
                            </Link>
                        )}
                    </div>
                </header>

                {/* Cover + Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
                    {/* Thumbnails */}
                    <div className=" col-span-1 lg:col-span-2 aspect-[16/9] ">
                        <CustomCarousel data={data.images}  isProjectDetails={true}/>
                    </div>
                    {/* Details Card */}
                    <aside className=" bg-dark-2 border border-dark-3 p-4 lg:p-5 h-fit">
                        <div className="flex items-center gap-2 text-text/80">
                            <Tags className="w-4 h-4" />
                            <span className="text-sm">Technologies</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {data.skills.map((s: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-dark-3 text-text text-xs capitalize">
                                    {s}
                                </span>
                            ))}
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-text/80">
                            <LinkIcon className="w-4 h-4" />
                            <span className="text-sm">Links</span>
                        </div>
                        <div className="mt-3 grid gap-2 text-sm">
                            {data.demo && (
                                <Link href={data.demo} target="_blank" className="truncate text-main hover:underline">
                                    {data.demo}
                                </Link>
                            )}
                            {data.code && (
                                <Link href={data.code} target="_blank" className="truncate hover:underline">
                                    {data.code}
                                </Link>
                            )}
                        </div>
                    </aside>

                </div>



            </div>
        </section>
    );
}
