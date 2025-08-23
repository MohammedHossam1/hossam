"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IProject } from "@/types";
import SectionHeader from "@/components/shared/section-header";
import ProjectCard from "@/components/layout/projects/project-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const projects: IProject[] = [
  {
    id: "1",
    slug: "portfolio",
    name: "Portfolio Website",
    url: "/images/p1.jpg",
    images: [],
    description: "Personal portfolio built with Next.js and Tailwind.",
    skills: ["Next.js", "Tailwind"],
    code: "#",
    demo: "#",
  },
  {
    id: "2",
    slug: "mobile-app",
    name: "Mobile App",
    url: "/images/p2.jpg",
    images: [],
    description: "React Native mobile app for booking services.",
    skills: ["React Native"],
    code: "#",
    demo: "#",
  },
  {
    id: "3",
    slug: "dashboard",
    name: "Dashboard",
    url: "/images/p3.jpg",
    images: [],
    description: "Admin dashboard with charts and analytics.",
    skills: ["React", "Chart.js"],
    code: "#",
    demo: "#",
  },
];

const tabs = ["All", "Next.js", "React Native", "React"];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.skills.includes(activeTab));

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
              className={`px-2 py-1 text-sm transition-all cursor-pointer ${
                activeTab === tab
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
                  className={`cursor-pointer ${
                    activeTab === tab ? "font-semibold text-primary" : ""
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
          {filteredProjects.map((project) => (
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
    </section>
  );
};

export default Projects;
