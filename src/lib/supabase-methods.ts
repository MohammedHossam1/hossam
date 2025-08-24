import { IProject } from "@/types";
import { supabase } from "./supabase-client";

export async function getProjects(page: number, limit: number): Promise<{ data: IProject[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" }) 
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data: data as IProject[], total: count ?? 0 };
}
