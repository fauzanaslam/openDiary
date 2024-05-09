import React from "react";
import Image from "next/image";
import { IDiary } from "@/utils/supabase";
import Link from "next/link";
import GetPastTime from "../GetPastTime";

const PostContent = ({
  diary_id,
  avatar,
  content,
  username,
  email,
  diary_image,
  created_at,
}: IDiary): React.ReactElement => {
  return (
    <div className="flex justify-between items-center flex-1">
      <div className="flex flex-1 gap-2 px-5 pb-5 pt-3">
        <div className="items-center gap-4 min-w-[50px]">
          <Link href={`/${email}`}>
            <Image
              src={avatar as string}
              alt={avatar as string}
              width={45}
              height={45}
              className="rounded-full bg-primary p-2"
            />
          </Link>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Link href={`/${email}`} className="hover:underline">
              <p className="font-semibold text-md">{username || email}</p>
            </Link>
            <GetPastTime past_time={created_at} />
          </div>
          <p className="text-md">{content}</p>
          {diary_image && (
            <Image
              src={diary_image as string}
              alt={diary_image as string}
              width={400}
              height={200}
              className=" p-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
