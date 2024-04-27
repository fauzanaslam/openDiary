// "use server";

// import { supabase } from "@/utils/supabase";
// import { redirect } from "next/navigation";

// export default async function deleteDiaryAction(diary_id: number | undefined) {
//   const { error } = await supabase.from("diary").delete().eq("id", diary_id);
//   redirect("/dashboard/my-diary");
// }

"use server";

import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function deleteDiaryAction(diary_id: number | undefined) {
  try {
    const { error } = await supabase.from("diary").delete().eq("id", diary_id);
    if (error) {
      throw new Error("Failed to delete diary entry");
    }
    redirect("/dashboard/my-diary");
  } catch (error) {
    console.error("Error deleting diary entry:", error);
    // Lakukan redirect ke halaman yang sesuai untuk penanganan kesalahan
    redirect("/error");
  }
}
