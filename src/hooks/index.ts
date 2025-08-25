import { getProjectBySlug, getProjects, getSkills, getSkillsFilter } from "@/lib/supabase-methods";
import { IProject, ISkill } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type ProjectsQueryData = {
  data: IProject[];
  total: number;
};

export function useProjects(page: number, limit: number) {
  const options: UseQueryOptions<ProjectsQueryData, Error> = {
    queryKey: ["projects", page, limit],
    queryFn: () => getProjects(page, limit),
  };

  return useQuery(options);
}
type SkillsQueryData = {
  data: ISkill[];
  total: number;
};

export function useSkills() {
  const options: UseQueryOptions<SkillsQueryData, Error> = {
    queryKey: ["skills"],
    queryFn: () => getSkills(),
    staleTime: 1000 * 60 * 5, 
  };

  return useQuery(options);
}
type SkillsFilterQueryData = {
  data: ISkill[];
  total: number;
};

export function useSkillsFilter() {
  const options: UseQueryOptions<SkillsFilterQueryData, Error> = {
    queryKey: ["skills_filter"],
    queryFn: getSkillsFilter,
    staleTime: 1000 * 60 * 5, 
  };

  return useQuery(options);
}

export function useGetProjectBySlug(slug: string) {
  const options: UseQueryOptions<IProject | null, Error> = {
    queryKey: ["project_by_slug", slug],
    queryFn: () => getProjectBySlug(slug),
    staleTime: 1000 * 60 * 5, 
    enabled: !!slug,


};

return useQuery(options);
}
