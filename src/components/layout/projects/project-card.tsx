import React from "react";
import ImageFallBack from "../../shared/image-fall-back";
import { IProject } from "@/types";
import Link from "next/link";

const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`} className="bg-card text-text shadow-lg p-4 flex flex-col gap-5 transition-all duration-300">
      {project.url && (
        <div className="w-full relative h-40 overflow-hidden ">
          <ImageFallBack
            fill
            src={project.url}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="">
        <h3 className="text-base text-white font-semibold">{project.name}</h3>
        <p className="text-sm mt-1 ">{project.description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
