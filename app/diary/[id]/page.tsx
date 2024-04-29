import React from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import Wrapper from "../../../components/global/Wrapper";
import CreateCommentFrom from "../../../components/auth/CreateCommentFrom";
import CommentList from "../../../components/global/(diary)/CommentList";

type ParamsProps = {
  params: {
    id: number;
  };
};

const page = async ({ params }: ParamsProps) => {
  const { data, error } = await supabase
    .from("diary")
    .select()
    .order("created_at", { ascending: false })
    .eq("id", params.id)
    .single();

  const { data: imageData } = await supabase
    .from("diary")
    .select("diary_image")
    .order("created_at", { ascending: false })
    .eq("id", params.id)
    .single();
  console.log("🚀 ~ page ~ imageData:", imageData);

  const posted_at = new Date(data.created_at).toLocaleDateString();

  if (error) return <p>please reload the page</p>;

  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col mx-auto justify-center">
          <Image
            src={imageData?.diary_image}
            alt={data.avatar}
            width={400}
            height={200}
          />
          <i className="text-center">{posted_at}</i>
        </div>
        <h3 className="italic text-xl font-bold">
          ~{data.username || data.email}
        </h3>
        <p className="text-lg">{data.content}</p>
        <CommentList diary_id={data.id} user={data.username || data.email} />
        <CreateCommentFrom diary_id={data.id} />
      </div>
    </Wrapper>
  );
};

export default page;
