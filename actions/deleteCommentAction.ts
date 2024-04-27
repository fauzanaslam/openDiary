"use server";

import { IComments, supabase } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export const deleteCommentAction = async (
  comment_id: number,
  diary_id: number
) => {
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

  revalidatePath(`/diary/${diary_id}`);
};
