"use client";

import { motion } from "framer-motion";

const ProjectCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SkeletonCard />
      <div className="hidden md:block">
        <SkeletonCard />
      </div>
      <div className="hidden lg:block">
        <SkeletonCard />
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <motion.div
    initial={{ opacity: 0.3 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0.3 }}
    transition={{
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
      repeatType: "reverse",
    }}
    className="h-full bg-card text-text shadow-lg flex flex-col gap-4 overflow-hidden "
  >
    {/* صورة المشروع */}
    <div className="w-full relative h-40 bg-dark-3  animate-pulse" />

    {/* النصوص والمحتوى */}
    <div className="px-4 pb-2 space-y-3">
      <div className="flex items-center justify-between pb-2">
        <div className="h-4 w-32 bg-dark-1 rounded-md animate-pulse" />
        <div className="h-6 w-6 bg-dark-1 rounded-full animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-dark-1 rounded-md animate-pulse" />
        <div className="h-3 w-3/4 bg-dark-1 rounded-md animate-pulse" />
      </div>
    </div>
  </motion.div>
);

export default ProjectCardSkeleton;
