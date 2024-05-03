"use client";

import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const LikesButton = ({ diary }: any) => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const handleLike = async () => {
    if (isSignedIn) {
      if (diary.likes.length != 0) {
        const data: any = [];
        await supabase.from("diary").update({ likes: data }).eq("id", diary.id);
        router.refresh();
      } else {
        const newLikes = [user];
        await supabase
          .from("diary")
          .update({ likes: newLikes })
          .eq("id", diary.id);
        router.refresh();
      }
    }
  };

  return (
    <div>
      <button onClick={handleLike}>Like {diary.likes.length}</button>
    </div>
  );
};

export default LikesButton;
