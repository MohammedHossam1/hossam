"use client";

import { CustomCarousel } from "@/components/shared/custom-carousel";
import SectionHeader from "@/components/shared/section-header";
import { CarouselItem } from "@/components/ui/carousel";
import { useGetFeaturedVideos } from "@/hooks";
import { IVideo } from "@/types";
import VideoCard, { VideoSkeleton } from "./video-card";

const FeaturedReels = () => {
  const { data, isLoading } = useGetFeaturedVideos();
  const skeletonCount = 6;

  return (
    <section className="space-y-4">
      <SectionHeader title="Featured Videos" seeAllLink="/videos" />
      <CustomCarousel>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <VideoSkeleton />
              </CarouselItem>
            ))
          : data?.data?.map((video: IVideo) => (
              <CarouselItem
                key={video.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <VideoCard video={video} />
              </CarouselItem>
            ))}
      </CustomCarousel>
    </section>
  );
};

export default FeaturedReels;
