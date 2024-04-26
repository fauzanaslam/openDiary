import Wrapper from "@/components/global/Wrapper";
import React from "react";
import PostContent from "../../../components/global/(diary)/PostContent";
import { supabase } from "@/utils/supabase";
import { getUserData } from "@/utils/clerk";
import Buttondelete from "../../../components/global/(button)/Buttondelete";

const page = async (): Promise<React.ReactElement> => {
  const { email } = await getUserData();

  const { data, error } = await supabase
    .from("diary")
    .select()
    .order("created_at", { ascending: false })
    .eq("email", email);

  if (data?.length == 0)
    return <h1 className="flex justify-center">Diary not found</h1>;

  if (error) return <p>please reload the page...</p>;

  return (
    <Wrapper title="My Diary">
      <div className="gap-4">
        {data.map((diary) => {
          return (
            <div
              key={diary.id}
              className="flex justify-between items-center md:gap-4"
            >
              <PostContent
                diary_id={diary.id}
                avatar={diary.avatar}
                content={diary.content}
                email={diary.email}
                username={diary.username}
              />
              <Buttondelete diary_id={diary.id} />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default page;
