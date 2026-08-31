"use client";

import { IVideo } from "@/types";
import { use } from "react";
import VideoCard, { VideoSkeleton } from "./video-card";

interface VideosProps {
  data: Promise<{ data: IVideo[]; total: number }>;
}

const Videos = ({ data }: VideosProps) => {
  const finalData = use(data);
  const skeletonCount = 10;

  return (
    <section className="min-h-[calc(100dvh-70px)] lg:min-h-[calc(100dvh-30px)]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {!finalData
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <VideoSkeleton key={idx} />
            ))
          : finalData?.data?.map((video: IVideo) => (
              <VideoCard key={video.id} video={video} />
            ))}
      </div>
    </section>
  );
};

export default Videos;
