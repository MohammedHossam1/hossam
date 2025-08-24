import { getProjects } from "@/lib/supabase-methods";
import { IProject } from "@/types";
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
