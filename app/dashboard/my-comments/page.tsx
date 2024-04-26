import Wrapper from "@/components/global/Wrapper";
import { getUserData } from "@/utils/clerk";
import { IComments, supabase } from "@/utils/supabase";
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
            <Link
              key={comment.comment_id}
              href={`/diary/${comment.comment_id}`}
            >
              <div className="mx-4 card card-body card-bordered bg-base-300 hover:bg-base-200 ease-in-out duration-300">
                <div className="flex justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="items-center gap-4">
                      <Image
                        src={comment.avatar as string}
                        alt={comment.avatar as string}
                        width={45}
                        height={45}
                        className="rounded-full bg-primary p-2"
                      />
                    </div>
                    <div>
                      <p className="font-bold mb-2">
                        {comment.username || comment.email}
                      </p>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        <div className="divider"></div>
      </div>
    </Wrapper>
  );
};

export default page;
