"use server";

import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function deleteDiaryAction(diary_id: number | undefined) {
  const { error } = await supabase.from("diary").delete().eq("id", diary_id);
  redirect("/dashboard/my-diary");
}
