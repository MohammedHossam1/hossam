"use client";

import { projects } from "@/constants";
import { CustomCarousel } from "../../shared/custom-carousel";
import SectionHeader from "../../shared/section-header";

const FeaturedProjects = () => {
    return (
        <section className=" text-text">
            <SectionHeader title="Featured Projects" />
            <CustomCarousel data={projects} />

        </section>
    );
};

export default FeaturedProjects;
