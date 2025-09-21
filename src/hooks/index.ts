import { getFeaturedVideos, getProjectReactions, getProjects, getSkills, getSkillsFilter, getVideos } from "@/lib/supabase-methods";
import { getClientIp } from "@/lib/utils";
import { IProject, ISkill } from "@/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

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


export function useGetProjectReactions(projectId: string, ip: string) {
  return useQuery({
    queryKey: ["reactions", projectId, ip],
    queryFn: () => getProjectReactions(projectId, ip),
    enabled: !!projectId && !!ip,
    staleTime: 1000 * 60 * 5,
  });
}
export function useGetVideos(page = 1, limit = 5) {
  return useQuery({
    queryKey: ["videos" + page + limit],
    queryFn: () => getVideos(page, limit),
    staleTime: 1000 * 60 * 5,
  });
}
export function useGetFeaturedVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: () => getFeaturedVideos(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetClientIp() {
  return useQuery({
    queryKey: ["client_ip"],
    queryFn: () => getClientIp(),
    staleTime: 1000 * 60 * 5,
  });
}