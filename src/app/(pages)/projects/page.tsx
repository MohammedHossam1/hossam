"use client";
import Loading from "@/app/loading";
import ProjectCard from "@/components/layout/projects/project-card";
import PaginationContainer from "@/components/shared/pagination";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjects, useSkillsFilter } from "@/hooks";
import { IProject, ISkill } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const Projects = () => {
  // const search = useSearchParams();
  const [allProjects, setAllProjects] = useState<IProject[]>([]);

  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 9;


  const { data, isLoading, isError }: any = useProjects(page, limit);
  const { data: skillsData, isError: skillsError }: any = useSkillsFilter();
  useEffect(() => {
    if (data?.data) {
      setAllProjects((prev) => {
        const newProjects = data.data.filter(
          (p: IProject) => !prev.some((existing) => existing.id === p.id)
        );
        return page === 1 ? data.data : [...prev, ...newProjects];
      });
    }
  }, [data, page]);
 
  const filteredProjects =
    activeTab === "all"
      ? allProjects
      : allProjects.filter((p: IProject) => p.skills.includes(activeTab));

  if (isLoading) return <Loading />;
  if (isError || skillsError) return <p>Something went wrong</p>;
  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <section className="w-full py-10 relative min-h-[100dvh]">
      {/* Header & Tabs */}
      <div className="flex justify-between items-center mb-8">
        <SectionHeader title="Projects" />

        {/* Tabs on large screens */}
        <div className="hidden lg:flex gap-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2 py-1 text-sm transition-all cursor-pointer capitalize ${activeTab === "all"
              ? "text-white"
              : "text-text hover:text-white"
              }`}
          >
            {"All"}
          </button>
          {skillsData?.data?.map((tab: ISkill, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tab.name)}
              className={`px-2 py-1 text-sm transition-all cursor-pointer capitalize ${activeTab === tab.name
                ? "text-white"
                : "text-text hover:text-white"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Dropdown on small screens */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm bg-transparent border-0 hover:bg-transparent capitalize hover:text-white"
              >
                {activeTab} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setActiveTab("all")}
                className={`cursor-pointer capitalize ${activeTab === "all" ? "font-semibold text-primary" : ""
                  }`}
              >
                {"All"}
              </DropdownMenuItem>
              {skillsData?.data.map((tab: ISkill) => (
                <DropdownMenuItem
                  key={tab.id}
                  onClick={() => setActiveTab(tab.name)}
                  className={`cursor-pointer capitalize ${activeTab === tab.name ? "font-semibold text-primary" : ""
                    }`}
                >
                  {tab.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProjects?.map((project: IProject) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <PaginationContainer page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
};

export default Projects;
