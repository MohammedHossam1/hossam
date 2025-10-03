"use client";

import { IProject } from "@/types";
import { CustomCarousel } from "../../shared/custom-carousel";
import SectionHeader from "../../shared/section-header";
import { CarouselItem } from "@/components/ui/carousel";
import ProjectCard from "./project-card";
import Link from "next/link";
import { use } from "react";
import FadeEffect from "@/components/shared/fade-effect";
const FeaturedProjects = ({ data }: { data: Promise<{ data: IProject[]; total: number }> }) => {
    const projects = use(data);

    return (
        <FadeEffect>
            <div className=" text-text">
                <SectionHeader title="Featured Projects" seeAllLink="/projects" />
                <CustomCarousel >
                    <>
                        {projects?.data.map((item, index) => (
                            <CarouselItem key={index} className="w-full basis-full md:basis-1/2 lg:basis-1/3 ">
                                <ProjectCard project={item} />
                            </CarouselItem>
                        ))}
                        <CarouselItem className="w-full basis-full md:basis-1/2 lg:basis-1/3 group">
                            <Link href={`/projects`} className="bg-card text-white tracking-widest group-hover:text-main shadow-lg flex flex-col h-full items-center justify-center transition-all duration-300">
                                All Projects
                            </Link>
                        </CarouselItem>
                    </>
                </CustomCarousel>
            </div >
        </FadeEffect>
    );
};

export default FeaturedProjects;
