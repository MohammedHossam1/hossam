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
    .order("priority", { ascending: true })

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

export async function addOrUpdateReaction(projectId: string, ip: string, reactionType: string | null) {
  const { data: existing, error: fetchError } = await supabase
    .from("reactions")
    .select("*")
    .eq("project_id", projectId)
    .eq("ip_address", ip)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error(fetchError.message);
  }

  if (existing) {
    if (reactionType === null || existing.reaction_type === reactionType) {
      // Remove the reaction
      const { error: deleteError } = await supabase
        .from("reactions")
        .delete()
        .eq("id", existing.id);
      if (deleteError) throw new Error(deleteError.message);
      return { success: true, action: "removed" };
    } else {
      // Update the reaction
      const { error: updateError } = await supabase
        .from("reactions")
        .update({ reaction_type: reactionType })
        .eq("id", existing.id);
      if (updateError) throw new Error(updateError.message);
      return { success: true, action: "updated" };
    }
  } else {
    // Add the reaction
    const { error: insertError } = await supabase
      .from("reactions")
      .insert([{ project_id: projectId, ip_address: ip, reaction_type: reactionType }]);
    if (insertError) throw new Error(insertError.message);
    return { success: true, action: "added" };
  }
}

export async function getProjectReactions(projectId: string, ip: string) {
  const { data, error } = await supabase
    .from("reactions")
    .select("reaction_type, ip_address")
    .eq("project_id", projectId);

  if (error) throw new Error(error.message);

  const counts: Record<string, number> = {};
  let userReaction: string | null = null;

  data?.forEach(r => {
    counts[r.reaction_type] = (counts[r.reaction_type] || 0) + 1;
    if (r.ip_address === ip) {
      userReaction = r.reaction_type;
    }
  });

  return { counts, userReaction };
}
