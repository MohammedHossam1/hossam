import { IVideo } from '@/types';
import { Play } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

const VideoCard = ({ video }: { video: IVideo }) => {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  const handleCardClick = (video: IVideo) => {
    setSelectedVideo(video);
    setOpen(true);
  };
    return (
        <div
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
            <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-gray-500 shadow border border-gray-500 ">
                {/* Overlay */}
                <div className="absolute bottom-0 right-0 inset-x-0 h-1/3 group-hover:h-0 transition-all duration-700 bg-gradient-to-t from-black/80 to-black/0 z-10"></div>

                {/* Preview video */}
                <video
                    src={video.video_src}
                    className="h-full w-full object-cover   rounded-xl"
                    muted
                    loop
                    playsInline
                />

                {/* Play logo */}
                <div className="absolute top-2 right-2 bg-black/50 group-hover:translate-x-30 transition-all duration-700 rounded-full p-2 z-20">
                    <Play className="text-white w-5 h-5 animate-pulse" />
                </div>

                {/* Title */}
                <div className="absolute bottom-2 left-1  rounded-xl group-hover:opacity-0 transition-all duration-600 text-white z-20">
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
            {/* Dialog with animation */}
            <AnimatePresence>
                {open && selectedVideo && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-20"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Video box */}
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-50 w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <video
                                src={selectedVideo.video_src}
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default VideoCard