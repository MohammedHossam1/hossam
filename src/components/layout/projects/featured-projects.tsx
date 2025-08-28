"use client";

import { IProject } from "@/types";
import { CustomCarousel } from "../../shared/custom-carousel";
import SectionHeader from "../../shared/section-header";

const FeaturedProjects = ({ data }: { data: IProject[] }) => {




    return (
        <section className=" text-text">
            <SectionHeader title="Featured Projects" />
            <CustomCarousel data={data} isProjectDetails={false} />
        </section>
    );
};

export default FeaturedProjects;
