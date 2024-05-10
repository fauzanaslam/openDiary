import { supabase } from "@/utils/supabase";
import Image from "next/image";
import React from "react";
import GetPastTime from "../GetPastTime";

type ParamsProps = {
  email: string;
};

const CommentList = async ({ email }: ParamsProps) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  if (error) return <p>please reload the page...</p>;
  if (!data.content?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="divider"></div>
      {data.content.map((content: any, index: number) => {
        return (
          <div
            key={content.randomID}
            className="mx-4 card card-body card-bordered p-4 bg-base-200"
          >
            <div className="md:flex justify-between gap-4 items-center">
              <div className="flex gap-4">
                <div className="min-w-[50px]">
                  <Image
                    src={data.avatar as string}
                    alt={data.avatar as string}
                    width={50}
                    height={50}
                    className="rounded-full bg-primary"
                  />
                </div>
                <div>
                  <div className="md:flex items-center mb-2">
                    <p className="font-bold md:text-lg">{email}</p>
                    <GetPastTime past_time={content.created_at} />
                  </div>
                  <p>{content.content}</p>
                  {content.diary_image && (
                    <Image
                      src={content.diary_image as string}
                      alt={content.diary_image as string}
                      width={400}
                      height={200}
                      className=" p-2"
                    />
                  )}
                </div>
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
