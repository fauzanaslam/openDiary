"use server";

import { supabase } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export default async function deleteDiaryAction(diary_id: number | undefined) {
  const { error } = await supabase.from("diary").delete().eq("id", diary_id);
  revalidatePath("/dashboard/my-diary");
}
