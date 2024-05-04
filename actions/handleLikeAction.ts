"use server";

import { getUserData } from "@/utils/clerk";
import { log } from "console";

export const handleLikeAction = async () => {
  const { avatar, email, username } = await getUserData();
  console.log("🚀 ~ handleLikeAction ~ email:", email);
};
