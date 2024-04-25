import { IComments, supabase } from "@/utils/supabase";
import Image from "next/image";
import React from "react";
import DeleteCommentButton from "../(button)/DeleteCommentButton";

type ParamsProps = {
  diary_id: number;
};

const CommentList = async ({ diary_id }: ParamsProps) => {
  const { data, error } = await supabase
    .from("diary")
    .select("comments")
    .eq("id", diary_id)
    .single();

  if (error) return <p>please reload the page...</p>;
  if (!data.comments?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="divider"></div>
      {data.comments.map((comment: IComments, index: number) => {
        return (
          <div
            key={comment.comment_id}
            className="ml-4 card card-body card-bordered p-4 bg-base-200"
          >
            <div className="flex justify-between gap-4">
              <div className="flex gap-4">
                <Image
                  src={comment.avatar as string}
                  alt={comment.avatar as string}
                  width={50}
                  height={50}
                  className="rounded-full bg-primary"
                />
                <div>
                  <div className="flex gap-1 items-center mb-2">
                    <p className="font-bold text-lg">
                      {comment.username || comment.email}
                    </p>
                    <p>- {comment.created_at}</p>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
              <DeleteCommentButton diary_id={diary_id} comment_id={index} />
            </div>
          </div>
        );
      })}
      <div className="divider"></div>
    </div>
  );
};

export default CommentList;
