import React from "react";
import ImageFallBack from "../../shared/image-fall-back";
import { IProject } from "@/types";
import Link from "next/link";

const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`} className="bg-card text-text shadow-lg flex flex-col gap-4 h-full transition-all duration-300">
      {project.url && (
        <div className="w-full relative h-40 overflow-hidden ">
          <ImageFallBack
            fill
            src={project.url}
            sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            33vw"
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className=" px-4 pb-2">
        <h3 className="text-base text-white font-semibold">{project.name}</h3>
        <p className="text-sm mt-1 line-clamp-3 ">{project.description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
