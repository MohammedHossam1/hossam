import { IProject, ISkill } from "@/types";
import { supabase } from "./supabase-client";

export async function getProjects(page: number, limit: number): Promise<{ data: IProject[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .order("priority", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data: data as IProject[], total: count ?? 0 };
}
export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug) // الشرط
    .single(); // بيرجع عنصر واحد فقط

  if (error) {
    console.error("Error fetching project:", error.message);
    return null;
  }

  return data as IProject;
}
export async function getSkills() {
  const { data, error, count } = await supabase
    .from("skills")
    .select("*", { count: "exact" })

  if (error) throw new Error(error.message);

  return { data: data as ISkill[], total: count ?? 0 };
}
export async function getSkillsFilter() {
  const { data, error, count } = await supabase
    .from("skills_filter")
    .select("*", { count: "exact" })

  if (error) throw new Error(error.message);

  return { data: data as ISkill[], total: count ?? 0 };
}
