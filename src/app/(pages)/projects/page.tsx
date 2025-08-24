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
import { useProjects } from "@/hooks";
import { IProject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";


const tabs = ["All", "Next.js", "React Native", "React"];

const Projects = () => {
  // const search = useSearchParams();

  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 3;


  const { data, isLoading, isError }: any = useProjects(page, limit);
  console.log(data, "projects");
  // useEffect(() => {
  //   setPage(search.get("page") ? Number(search.get("page")) : 1);
  // }, [page])
  if (isLoading) return <Loading />;
  if (isError) return <p>Something went wrong</p>;
  // const filteredProjects =
  //   activeTab === "All"
  //     ? projects
  //     : projects.filter((p) => p.skills.includes(activeTab));
  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <section className="w-full py-10 relative min-h-[100dvh]">
      {/* Header & Tabs */}
      <div className="flex justify-between items-center mb-8">
        <SectionHeader title="Projects" />

        {/* Tabs on large screens */}
        <div className="hidden lg:flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-sm transition-all cursor-pointer ${activeTab === tab
                ? "text-white"
                : "text-text hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dropdown on small screens */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm bg-transparent border-0 hover:bg-transparent hover:text-white"
              >
                {activeTab} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {tabs.map((tab) => (
                <DropdownMenuItem
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer ${activeTab === tab ? "font-semibold text-primary" : ""
                    }`}
                >
                  {tab}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {data?.data.map((project: IProject) => (
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
