import { IProject, ISkill } from "@/types";
import { supabase } from "./supabase-client";

export async function getProjects(page: number, limit: number): Promise<{ data: IProject[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .order("priority", { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data: data as IProject[], total: count ?? 0 };
}
export async function getAllProjectSlugs() {
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data?.map((d) => d.slug?.trim()) || [];
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
export async function getSideSkills(): Promise<IProject | null> {
  const { data, error } = await supabase
    .from("side_skills")
    .select("*")

  if (error) {
    console.error("Error fetching project:", error.message);
    return null;
  }
  return data as any;
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
export async function sendMessage(data: { name: string; email: string; message: string }) {
  if (!data.name || !data.email || !data.message) {
    throw new Error("All fields are required");
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert([{
      name: data.name,
      email: data.email,
      message: data.message,
    }]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
