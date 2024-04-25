"use server";

import { redirect } from "next/navigation";
import { getUserData } from "@/utils/clerk";
import { supabase, IDiary } from "@/utils/supabase";
import { Redirect } from "next";

export const createDiaryAction = async (formData: FormData): Promise<void> => {
  const content = formData.get("content") as string;
  const { avatar, email, username } = await getUserData();

  if (!content || !email || !username) return;

  const data: IDiary = { content, email, username, avatar };

  await supabase.from("diary").insert(data);

  redirect("/dashboard/my-diary");
};
