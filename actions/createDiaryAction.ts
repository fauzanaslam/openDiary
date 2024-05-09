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
  // const userContentId = randomUUID();
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

  let diary_image: string | null = imageUrl.publicUrl;
  if (image.name == "undefined") {
    diary_image = null;
  }

  const diaryData: IDiary = { content, email, username, avatar, diary_image };
  await supabase.from("diary").insert(diaryData);

  const existingUserData = await supabase
    .from("user")
    .select("*")
    .eq("email", email);

  // const userContent = {
  //   userContentId,
  //   content,
  //   diary_image,
  // };

  if (existingUserData.data && existingUserData.data.length === 0) {
    const userData = { email, content: [content] };
    await supabase.from("user").insert(userData);
  } else if (existingUserData.data && existingUserData.data.length > 0) {
    const updatedContent = [...existingUserData.data[0].content, content];
    await supabase
      .from("user")
      .update({ content: updatedContent })
      .eq("email", email);
  }

  redirect("/dashboard/my-diary");
};
