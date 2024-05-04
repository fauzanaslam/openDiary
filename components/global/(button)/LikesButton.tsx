"use client";

import { supabase } from "@/utils/supabase";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const LikesButton = ({ email, diary }: any) => {
  const [liked, setLiked] = useState(false);
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
        setLiked(false);
      } else {
        newLikes = [...existingLike, email];
        setLiked(true);
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
      <button onClick={handleLike} className="flex items-center gap-1">
        {liked ? <FaHeart /> : <FaRegHeart />}
        {diary.likes.length}
      </button>
    </div>
  );
};

export default LikesButton;
