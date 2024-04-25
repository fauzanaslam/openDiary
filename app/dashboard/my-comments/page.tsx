import Wrapper from "@/components/global/Wrapper";
import { getUserData } from "@/utils/clerk";
import { IComments, supabase } from "@/utils/supabase";
import React from "react";
import Image from "next/image";

const page = async () => {
  const { email } = await getUserData();
  const { data, error } = await supabase.from("diary").select("comments");
  const comments: any = data?.filter((item) => {
    if (item.comments && item.comments.length > 0) {
      return item.comments.some((comment: any) => comment.email == email);
    }
    return false;
  });

  const commentsByEmails: Array<IComments> = comments
    ?.map((item: any) => item.comments)
    .flat()
    .filter((comment: any) => comment.email == email);

  if (error) return <h1>please reload the page</h1>;

  return (
    <Wrapper
      title={
        commentsByEmails.length > 0 ? "All Comments" : "Comment not available"
      }
    >
      <div className="flex flex-col gap-4">
        <div className="divider"></div>
        {commentsByEmails.map((comment) => {
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
                    <p className="font-bold mb-2">
                      {comment.username || comment.email}
                    </p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="divider"></div>
      </div>
    </Wrapper>
  );
};

export default page;
