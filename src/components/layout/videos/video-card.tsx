"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IVideo } from "@/types";
import { Play } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export const VideoSkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative rounded-xl overflow-hidden aspect-[9/16] bg-dark-2/60 border border-white/5 animate-pulse ${className}`}
  />
);

interface VideoCardProps {
  video: IVideo;
  className?: string;
}

const normalizeTags = (rawTag: string[] | string | undefined | null): string[] => {
  if (!rawTag) return [];
  if (Array.isArray(rawTag)) return rawTag.filter(Boolean);
  if (typeof rawTag === "string") {
    if (rawTag.includes(",")) {
      return rawTag
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    const trimmed = rawTag.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
};

const VideoCard = ({ video, className = "" }: VideoCardProps) => {
  const [open, setOpen] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const tags = normalizeTags(video.tag);

  const handleMouseEnter = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.play().catch(() => {
        // Ignore autoplay errors if any
      });
    }
  };

  const handleMouseLeave = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
      previewVideoRef.current.currentTime = 0;
    }
  };

  const handleCardClick = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
    setOpen(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative rounded-xl overflow-hidden aspect-[9/16] bg-dark-2 border border-white/5 hover:border-main/40 transition-all duration-300 shadow-md cursor-pointer select-none ${className}`}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Video preview thumbnail */}
        <video
          ref={previewVideoRef}
          src={video.video_src}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Play badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white group-hover:bg-main group-hover:text-dark-1 transition-all duration-300 rounded-full p-2.5 z-20 shadow-lg group-hover:scale-110">
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </div>

        {/* Video Title & Tag metadata */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 z-20 flex flex-col gap-1 transition-transform duration-300">
          <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-main transition-colors">
            {video.title}
          </h3>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              {tags.slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  href={`/videos?tag=${tag}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-text hover:text-main capitalize font-medium flex items-center gap-1 transition-colors w-fit"
                >
                  <span className="text-main font-bold">#</span>
                  {tag}
                </Link>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-text">+{tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* shadcn Dialog Player */}
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          dir="rtl"
          className="p-0 sm:max-w-4xl max-w-[95vw] w-fit border border-white/10 bg-dark-2/95 backdrop-blur-md overflow-hidden rounded-2xl gap-0 shadow-2xl focus:outline-none"
        >
          {/* Responsive Video Container - supports reels (vertical 9:16) & landscape (horizontal 16:9) */}
          <div className="relative flex items-center justify-center w-full bg-black/95 overflow-hidden">
            {open && (
              <video
                src={video.video_src}
                className="max-h-[75vh] md:max-h-[80vh] max-w-full w-auto h-auto object-contain focus:outline-none"
                controls
                autoPlay
                playsInline
              />
            )}
          </div>

          {/* Dialog Header / Footer Info */}
          <DialogHeader className="p-4 w-full bg-dark-2 border-t border-white/10 text-right! gap-1">
            <DialogTitle className="text-base md:text-lg font-bold text-white line-clamp-2">
              {video.title}
            </DialogTitle>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {tags.map((tag) => (
                  <DialogDescription key={tag} className="text-xs text-main capitalize font-medium">
                    <Link href={`/videos?tag=${tag}`}>
                      <span className="text-main font-bold">#</span>
                      {tag}
                    </Link>
                  </DialogDescription>
                ))}
              </div>
            )}
            {video.description && (
              <p className="text-xs text-text mt-1">
                {video.description}
              </p>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCard;