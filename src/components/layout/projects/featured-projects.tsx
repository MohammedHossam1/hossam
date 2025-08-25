"use client";

import { useProjects } from "@/hooks";
import { CustomCarousel } from "../../shared/custom-carousel";
import SectionHeader from "../../shared/section-header";
import Loading from "@/app/loading";

const FeaturedProjects = () => {

    const { data, isLoading, isError }: any = useProjects(1, 5);
    if (isLoading) return <Loading />;
    if (isError) return <p>Something went wrong</p>;


    return (
        <section className=" text-text">
            <SectionHeader title="Featured Projects" />
            <CustomCarousel data={data?.data} isProjectDetails={false} />
        </section>
    );
};

export default FeaturedProjects;
