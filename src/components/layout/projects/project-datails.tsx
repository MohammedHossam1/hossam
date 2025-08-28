"use client";
import { CustomCarousel } from "@/components/shared/custom-carousel";
import SectionHeader from "@/components/shared/section-header";
import Link from "next/link";
import { useState } from "react";
import ProjectNextPrevContact from "./project-next-prev-contact";
import ImageFallBack from "@/components/shared/image-fall-back";
import { motion, AnimatePresence } from "framer-motion";
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
export default function ProjectDetails({ data, prev, next }: { data: IProject, slug: string, prev: string | null, next: string | null }) {
    const [expanded, setExpanded] = useState(false);

    const SectionHead = ({ title }: { title: string }) => {
        return (
            <h2 className="text-white text-sm  font-semibold mb-2">
                {title}
            </h2>
        )
    }
    return (
        <section className="w-full py-5 relative">
            <div className="space-y-3 lg:space-y-8 ">
                <div className="">
                    <SectionHeader title={data.name} />
                    <ImageFallBack src={data.url} alt={data.name} width={1000} height={1000} className="w-full h-full object-cover" />

                </div>
                {data.images.length > 0 &&
                    <CustomCarousel data={data.images} isProjectDetails={true} />
                }
                <div className="">
                    <SectionHeader title={"Project Details"} />
                    <header className=" grid gap-2 lg:gap-6 grid-cols-1 md:grid-cols-3 items-center h-full ">
                        <div className="bg-card p-2  py-4 lg:p-6 h-full col-span-1 md:col-span-2">
                            <SectionHead title="Description" />
                            <AnimatePresence mode="wait">

                                <div
                                >
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: 1,
                                            height: expanded ? "auto" : 96 // 4 أسطر تقريبًا × line-height ~24px = 96px
                                        }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-text leading-6 text-[13px] font-light">
                                            {data.description}
                                        </p>


                                    </motion.div>
                                    {data.description.split(" ").length > 50 && (
                                        <button
                                            onClick={() => setExpanded(!expanded)}
                                            className="mt-1 text-main text-xs tracking-widest cursor-pointer font-bold group"
                                        >
                                            {expanded ? "Show Less" : "Read More"}
                                        </button>
                                    )}
                                </div>
                            </AnimatePresence>

                        </div>
                        {/* Details Card */}
                        <aside className=" bg-card p-2 py-4 lg:p-6  h-full  ">
                            <div className="flex items-center gap-2 text-text/80">
                                <SectionHead title="Technologies" />
                            </div>
                            <div className=" flex flex-wrap gap-1 mb-5">
                                {data.skills.map((s: string, i: number) => (
                                    <span key={i} className="px-2 py-1 rounded-sm bg-dark-3 text-text text-[10px] capitalize">
                                        {s}
                                    </span>
                                ))}
                            </div>

                            <div className=" grid gap-1 text-sm">
                                {data.demo && (
                                    <>
                                        <SectionHead title="Live Demo" />
                                        <Link href={data.demo} target="_blank" className="truncate text-main hover:underline">
                                            {data.demo}
                                        </Link>
                                    </>
                                )}
                                {data.code && (
                                    <>
                                        <SectionHead title="Code" />
                                        <Link href={data.code} target="_blank" className="truncate hover:underline">
                                            {data.code}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </aside>
                    </header>
                </div>

                <ProjectNextPrevContact next={next || ""} prev={prev || ""} />



            </div >
        </section >
    );
}
