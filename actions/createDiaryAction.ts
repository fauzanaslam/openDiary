"use server";

import { redirect } from "next/navigation";
import { getUserData } from "@/utils/clerk";
import { supabase, IDiary } from "@/utils/supabase";
import { randomUUID } from "crypto";

export const createDiaryAction = async (formData: FormData): Promise<void> => {
  const content = formData.get("content") as string;
  const { avatar, email, username } = await getUserData();
  const image: File = formData.get("image") as File;
  const fileName = `${randomUUID()}-${image.name}`;
  if (image.size !== 0) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, image, {
        cacheControl: "3600",
        upsert: false,
      });
  }

  const { data: imageUrl } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  let diary_image: any = imageUrl.publicUrl;
  if (image.name == "undefined") {
    diary_image = null;
  }

  const data1: IDiary = { content, email, username, avatar, diary_image };

  await supabase.from("diary").insert(data1);

  redirect("/dashboard/my-diary");
};
