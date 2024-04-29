import React from "react";
import Image from "next/image";
import { IDiary } from "@/utils/supabase";
import Link from "next/link";

const PostContent = ({
  diary_id,
  avatar,
  content,
  username,
  email,
  diary_image,
}: IDiary): React.ReactElement => {
  return (
    <div className="flex justify-between items-center flex-1">
      <Link
        href={`/diary/${diary_id}`}
        className="flex flex-1 gap-2 p-5 cursor-pointer duration-300 ease-in-out hover:bg-gray-800 transition-all border-b-2 border-gray-700"
      >
        <div className="items-center gap-4 min-w-[50px]">
          <Image
            src={avatar as string}
            alt={avatar as string}
            width={45}
            height={45}
            className="rounded-full bg-primary p-2"
          />
        </div>
        <div>
          <p className="font-semibold text-md">{username || email}</p>
          <p className="text-sm">{content}</p>
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
      </Link>
    </div>
  );
};

export default PostContent;
