"use client";

import { supabase } from "@/utils/supabase";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const LikesButton = ({ email, diary }: any) => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const handleLike = async () => {
    if (isSignedIn) {
      const getLikes = await supabase
        .from("diary")
        .select("likes")
        .eq("id", diary.id)
        .single();

      const existingLike = getLikes.data?.likes || [];

      let newLikes;

      if (existingLike.includes(email)) {
        newLikes = existingLike.filter((item: string) => item !== email);
      } else {
        newLikes = [...existingLike, email];
      }

      await supabase
        .from("diary")
        .update({ likes: newLikes })
        .eq("id", diary.id);
      router.refresh();
    }
  };
  return (
    <div>
      <button onClick={handleLike}>Likes {diary.likes.length}</button>
    </div>
  );
};

export default LikesButton;
