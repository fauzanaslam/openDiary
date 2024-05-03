import React from "react";
import PostContent from "./PostContent";
import { supabase } from "@/utils/supabase";
import LikesButton from "../(button)/LikesButton";

const CardDiaries = async (): Promise<React.ReactElement> => {
  const { data, error } = await supabase
    .from("diary")
    .select()
    .order("created_at", { ascending: false });

  if (error) return <p>please reload the page</p>;
  return (
    <div>
      {data.map((diary) => {
        return (
          <div key={diary.id} className=" border-b-2 border-gray-700">
            <PostContent
              key={diary.id}
              diary_id={diary.id}
              avatar={diary.avatar}
              content={diary.content}
              email={diary.email}
              username={diary.username}
              diary_image={diary.diary_image}
            />
            <div className="ml-20 mb-2"></div>
            <LikesButton diary={diary} />
          </div>
        );
      })}
    </div>
  );
};

export default CardDiaries;
