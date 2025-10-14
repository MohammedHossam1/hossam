"use client";

import { CarouselItem } from "@/components/ui/carousel";
import { IProject } from "@/types";
import Link from "next/link";
import { use } from "react";
import { CustomCarousel } from "../../shared/custom-carousel";
import SectionHeader from "../../shared/section-header";
import ProjectCard from "./project-card";
const FeaturedProjects = ({ data }: { data: Promise<{ data: IProject[]; total: number }> }) => {
    const finalData = use(data)
    return (
            <div className=" text-text">
                <SectionHeader title="Featured Projects" seeAllLink="/projects" />
                <CustomCarousel >
                    <>
                        {finalData.data.map((item, index) => (
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
    );
};

export default FeaturedProjects;
