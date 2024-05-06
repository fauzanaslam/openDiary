import React from "react";
import PostContent from "./PostContent";
import { supabase } from "@/utils/supabase";
import LikesButton from "../(button)/LikesButton";
import { getUserData } from "@/utils/clerk";

const CardDiaries = async (): Promise<React.ReactElement> => {
  const { email } = await getUserData();
  const { data, error } = await supabase
    .from("diary")
    .select()
    .order("created_at", { ascending: false });

  if (error) return <p>please reload the page</p>;
  return (
    <div>
      {data.map((diary) => {
        return (
          <div key={diary.id} className="relative border-b-2 border-gray-700">
            <PostContent
              key={diary.id}
              diary_id={diary.id}
              avatar={diary.avatar}
              content={diary.content}
              email={diary.email}
              username={diary.username}
              diary_image={diary.diary_image}
              created_at={diary.created_at}
            />
            <div className="absolute ml-20 mb-2 -bottom-2">
              <LikesButton email={email} diary={diary} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardDiaries;
