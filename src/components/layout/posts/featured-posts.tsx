"use client";

import FadeEffect from "@/components/shared/fade-effect";
import { CarouselItem } from "@/components/ui/carousel";
import { IPost } from "@/types";
import { use, useState } from "react";
import { CustomCarousel } from "../../shared/custom-carousel";
import SectionHeader from "../../shared/section-header";
const FeaturedPosts = ({ data }: { data: Promise<{ data: IPost[]; total: number }> }) => {
    const finalData = use(data)
    const [active, setActive] = useState(false);

    return (
        <FadeEffect>
            <div className=" text-text">
                <SectionHeader title="Featured Posts" seeAllLink="/posts" />
                <CustomCarousel >
                    <>
                        {finalData.data.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="w-full basis-full md:basis-1/2 lg:basis-1/3"
                            >
                                <div
                                    onClick={() => setActive(true)}
                                    onMouseLeave={() => setActive(false)}
                                    className="bg-white h-full  overflow-hidden hide-scrollbar shadow-md hover:shadow-lg transition-all duration-300">
                                    <div className="flex h-full w-full justify-center items-center ">
                                        <div
                                            className="w-full h-82 scroll-wrapper"
                                        >

                                            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7381460374769979392?collapsed=1" height="100%" width="100%" frameborder="0"
                                                style={{
                                                    pointerEvents: active ? "auto" : "none", 
                                                }}
                                                allowfullscreen="" title="Embedded post"></iframe>

                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>

                        ))}

                    </>
                </CustomCarousel>
            </div >
        </FadeEffect>
    );
};

export default FeaturedPosts;
