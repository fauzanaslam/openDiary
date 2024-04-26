import { IComments, supabase } from "@/utils/supabase";
import Image from "next/image";
import React from "react";
import DeleteCommentButton from "../(button)/DeleteCommentButton";
import { getUserData } from "@/utils/clerk";

type ParamsProps = {
  diary_id: number;
  user: string;
};

const CommentList = async ({ diary_id, user }: ParamsProps) => {
  const { email, username } = await getUserData();
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
            className="mx-4 card card-body card-bordered p-4 bg-base-200"
          >
            <div className="md:flex justify-between gap-4 items-center">
              <div className="flex gap-4">
                <div>
                  <Image
                    src={comment.avatar as string}
                    alt={comment.avatar as string}
                    width={50}
                    height={50}
                    className="rounded-full bg-primary"
                  />
                </div>
                <div className="max-w-[160px] md:max-w-[550px]">
                  <div className="md:flex gap-1 items-center mb-2">
                    <p className="font-bold md:text-lg">
                      {comment.username || comment.email}
                    </p>
                    <p className="w-full">- {comment.created_at}</p>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
              <div className="flex justify-end">
                {user == email || user == username || comment.email == email ? (
                  <DeleteCommentButton diary_id={diary_id} comment_id={index} />
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
      <div className="divider"></div>
    </div>
  );
};

export default CommentList;
