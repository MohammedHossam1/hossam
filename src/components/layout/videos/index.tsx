"use client"
import { CarouselItem } from "@/components/ui/carousel";
import { IVideo } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

// 🔹 Skeleton Card
const VideoSkeleton = () => (
    <CarouselItem className="basis-1/3 sm:basis-1/4 md:basis-1/5 xl:basis-1/6">
        <div className="relative overflow-hidden aspect-[9/16] bg-card animate-pulse" />
    </CarouselItem>
);

const Videos = ({ data }: { data:  Promise<{ data: IVideo[]; total: number }>}) => {
    const finalData = use(data) 

    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

    const handleCardClick = (video: IVideo) => {
        setSelectedVideo(video);
        setOpen(true);
    };

    const skeletonCount = 6;
    return (
        <section className="min-h-[calc(100dvh-70px)] lg:min-h-[calc(100dvh-30px)] ">
            <div className="grid grid-cols-3  sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5  gap-1">
                {!finalData
                    ? Array.from({ length: skeletonCount }).map((_, idx) => (
                          <VideoSkeleton key={idx} />
                      ))
                    : finalData?.data?.map((video: IVideo) => (
                          <motion.div
                              layoutId={`video-${video.id}`}
                              key={video.id}
                              className="cursor-pointer group"
                              onClick={() => handleCardClick(video)}
                              onMouseEnter={(e) => {
                                  const vid = e.currentTarget.querySelector(
                                      "video"
                                  ) as HTMLVideoElement;
                                  vid?.play();
                              }}
                              onMouseLeave={(e) => {
                                  const vid = e.currentTarget.querySelector(
                                      "video"
                                  ) as HTMLVideoElement;
                                  if (vid) {
                                      vid.pause();
                                      vid.currentTime = 0;
                                  }
                              }}
                          >
                              <div className="relative overflow-hidden aspect-[9/16]">
                                  {/* Overlay */}
                                  <div className="absolute bottom-0 right-0 inset-x-0 h-1/3 group-hover:h-0 transition-all duration-700 bg-gradient-to-t from-black/80 to-black/0 z-1"></div>

                                  {/* Preview video */}
                                  <video
                                      src={video.video_src}
                                      className="h-full w-full object-cover"
                                      muted
                                      loop
                                      playsInline
                                  />

                                  {/* Play logo */}
                                  <div className="absolute top-2 right-2 bg-black/50 group-hover:translate-x-30 transition-all duration-700 rounded-full p-2 z-1">
                                      <Play className="text-white w-5 h-5 animate-pulse" />
                                  </div>

                                  {/* Title */}
                                  <div className="absolute bottom-2 left-3 group-hover:opacity-0 transition-all duration-600 text-white z-1">
                                      <h3 className="text-sm text-white font-bold flex gap-2 items-center first-letter:text-main">
                                          {video.title}
                                      </h3>
                                      <Link
                                          href={`/videos?tag=${video.tag}`}
                                          className="text-xs hover:text-main transition-all duration-700 capitalize text-text font-bold flex gap-2 items-center"
                                      >
                                          {video.tag}
                                      </Link>
                                  </div>
                              </div>
                          </motion.div>
                      ))}

                {/* Dialog with animation */}
                <AnimatePresence>
                    {open && selectedVideo && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-40"
                                onClick={() => setOpen(false)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* Shared layout video */}
                            <motion.div
                                layoutId={`video-${selectedVideo.id}`}
                                className="fixed inset-0 m-auto z-50 w-[300px] aspect-[9/16] overflow-hidden shadow-2xl"
                            >
                                <video
                                    src={selectedVideo.video_src}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Videos;
