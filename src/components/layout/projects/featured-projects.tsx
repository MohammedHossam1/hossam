"use client";

import { IProject } from "@/types";
import { CustomCarousel } from "../../shared/custom-carousel";
import SectionHeader from "../../shared/section-header";
import { CarouselItem } from "@/components/ui/carousel";
import ProjectCard from "./project-card";
import Link from "next/link";

const FeaturedProjects = ({ data }: { data: IProject[] }) => {




    return (
        <section className=" text-text">
            <SectionHeader title="Featured Projects" />
            <CustomCarousel >
                <>
                    {data.map((item, index) => (
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
        </section>
    );
};

export default FeaturedProjects;
