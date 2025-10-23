import PostReaction from "@/components/shared/post-reaction";
import { useGetClientIp, useGetProjectReactions } from "@/hooks";
import { addOrUpdateReaction } from "@/lib/supabase-methods";
import { IProject } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
  const { data: ip } = useGetClientIp();
  const { data: reactions } = useGetProjectReactions(project.id, ip ?? "");
  const handleReactionChange = async (reaction: any) => {
    try {
      if (!ip) return;
      await addOrUpdateReaction(project.id, ip, reaction ? reaction.id : null);
    } catch (err) {
      console.error("Failed to update reaction:", err);
    }
  };

  return (
    <motion.div
      className=" h-full group">
      <div className="bg-card  text-text shadow-lg flex flex-col gap-4 h-full transition-all duration-300">
        {project.url && (
          <div className="w-full relative h-40 overflow-hidden ">
            <Image  
              fill
              src={project.url}
              sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            33vw"
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            />
          </div>
        )}
        <div className=" px-4 pb-2">
          <div className="flex gap-2 items-center justify-between pb-2" >

            <Link href={`/projects/${project.slug}`} className="text-base text-white group-hover:text-main transition-all duration-700 font-semibold">{project.name}</Link>
            <PostReaction
              initialCount={Object.values(reactions?.counts ?? {}).reduce((a, b) => a + b, 0)}
              initialReaction={reactions?.userReaction ?? null}
              onReactionChange={handleReactionChange}
            />
          </div>
          <Link href={`/projects/${project.slug}`} className="text-sm mt-1 line-clamp-2 lg:line-clamp-3 ">{project.description}</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
