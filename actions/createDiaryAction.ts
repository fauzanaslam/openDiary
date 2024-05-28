"use server";

import { redirect } from "next/navigation";
import { getUserData } from "@/utils/clerk";
import { supabase, IDiary } from "@/utils/supabase";
import { randomUUID } from "crypto";

export const createDiaryAction = async (formData: FormData): Promise<void> => {
  const content = formData.get("content") as string;
  const topics = JSON.parse(formData.get("topics") as string) as string[]; // Retrieve and parse the topics as an array
  console.log("🚀 ~ createDiaryAction ~ topic:", topics);
  const { avatar, email, username } = await getUserData();
  const image: File = formData.get("image") as File;
  const fileName = `${randomUUID()}-${image.name}`;
  const randomID = randomUUID();
  const created_at = new Date();

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
  if (image.name === "undefined") {
    diary_image = null;
  }

  const diaryData: IDiary = {
    content,
    email,
    username,
    avatar,
    diary_image,
    randomID,
    topics, // Include the topic in the diary data
  };
  await supabase.from("diary").insert(diaryData);

  const existingUserData = await supabase
    .from("user")
    .select("*")
    .eq("email", email);

  const userContent = {
    randomID,
    content,
    diary_image,
    created_at,
    topics, // Include the topic in the user content
  };

  if (existingUserData.data && existingUserData.data.length === 0) {
    const userData = { email, avatar, content: [userContent] };
    await supabase.from("user").insert(userData);
  } else if (existingUserData.data && existingUserData.data.length > 0) {
    const updatedContent = [...existingUserData.data[0].content, userContent];
    await supabase
      .from("user")
      .update({ content: updatedContent })
      .eq("email", email);
  }

  redirect("/dashboard/my-diary");
};
