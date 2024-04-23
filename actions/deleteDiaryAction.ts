import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

export const deleteDiaryAction = async (diary_id: number | undefined) => {
  await supabase.from("diary").delete().eq("id", diary_id);

  redirect("/dashboard/my-diary");
};
