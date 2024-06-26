"use server";

import { getUserData } from "@/utils/clerk";
import { supabase } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export default async function deleteDiaryAction(diary_id: number | undefined) {
  const { email } = await getUserData();
  const { data } = await supabase
    .from("diary")
    .select("randomID")
    .eq("id", diary_id)
    .single();
  await supabase.from("diary").delete().eq("id", diary_id);

  const { data: userContent } = await supabase
    .from("user")
    .select("content")
    .eq("email", email);
  const content = userContent?.map((item) => item.content).flat();
  const filteredContent = content?.filter(
    (item) => item.randomID !== data?.randomID
  );
  await supabase
    .from("user")
    .update({ content: filteredContent })
    .eq("email", email);
  revalidatePath("/dashboard/my-diary");
}
