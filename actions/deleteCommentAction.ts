"use server";

import { IComments, supabase } from "@/utils/supabase";
import { Redirect } from "next";
import { redirect } from "next/navigation";

type ParamsProps = {
  comment_id: number;
  diary_id: number;
};

export const deleteCommentAction = async (
  comment_id: number,
  diary_id: number
): Promise<Redirect> => {
  const getComment = await supabase
    .from("diary")
    .select("comments")
    .eq("id", diary_id)
    .single();

  let comments: Array<IComments> = getComment.data?.comments;

  comments.splice(comment_id, 1);

  const existingComment: Array<IComments> = comments || [];

  await supabase
    .from("diary")
    .update({ comments: existingComment })
    .eq("id", diary_id);

  redirect(`/diary/${diary_id}`);
};
